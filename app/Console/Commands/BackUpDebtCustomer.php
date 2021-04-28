<?php

namespace App\Console\Commands;

use App\Company;
use App\Init;
use App\PaymentPartnerRequest;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class BackUpDebtCustomer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'work:day';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Backup history debt customer every day';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $day_max = DB::table('history_debt_customer')->orderBy('day','DESC')->first()->day;
        $day_delete = $day_max - 30;
        if ($day_delete > 0) {
            DB::table('history_debt_customer')->where('day',$day_delete)->delete();
        }

        $customers = DB::table('customer')->get();
        foreach ($customers as $customer) {
            $company = [Company::CPTK, Company::TKC, Company::MD, Company::TMTK];
            // Tính số dư đầu kỳ mặc định của khách hàng
            $init = DB::table('init')->where('type', Init::TYPE_CUSTOMER)
                ->where('object_id', $customer->id)
                ->whereIn('company_id', $company);
            $in_money = $out_money = 0;
            if ($init) {
                $in_money = $init->sum('in_money');
                $out_money = $init->sum('out_money');
            }
            //Trường hợp trả lại tiền cho khách hàng thì sẽ cộng vào khoản phải thu của KH
            $partner_ids = DB::table('partner')->where('customer_id', $customer->id)->pluck('id');
            $return_customer = DB::table('payment_partner_request')->where('type', PaymentPartnerRequest::TYPE_RETURN_CUSTOMER)
                ->whereIn('partner_id', $partner_ids)->where('is_completed', 1);
            //Khi tính công nợ nhân viên không tính thanh toán của những đơn hàng lấy hóa đơn
            $order_ids = DB::table('order')->where('is_done', 1)->where('order_bill', 1)->pluck('id');
            $payment_ids = DB::table('payment')->whereNotNull('order_ids')->whereIn('order_ids', $order_ids)->pluck('id');
            // Tính tổng tiền đã thanh toán của khách hàng
            $checkout_money = \DB::table('payment')->whereIn('company_id', $company)
                ->where('customer_id', $customer->id)->whereNotIn('id', $payment_ids)
                ->whereDate('created_by', '<', date('Y-m-d'))
                ->sum('checkout_money');
            // Tính tổng tiền đơn hàng của khách hàng
            $total_order = \DB::table('order')
                ->where('customer_id', $customer->id)
                ->where('status', \App\Order::STATUS_ACTIVE)
                ->where('debt', 0)
                ->where('is_done', 1)
                ->where('order_bill', 0)
                ->whereDate('delivery_date', '<', date('Y-m-d'));
            //Nếu khách hàng trả hàng thì trừ tổng tiền đặt hàng đi
            $return_goods = \DB::table('return_goods')
                ->whereDate('created_at', '<', date('Y-m-d'))->where('customer_id', $customer->id);
            $return_customer = $return_customer
                ->whereDate('created_at', '<', date('Y-m-d'));
            $input['total_debt'] = $in_money + $total_order->sum('export_bill_total') + $return_customer->sum('money_total') - $out_money - $checkout_money - $return_goods->sum('total_out_money');
            DB::table('history_debt_customer')->insert(
                [
                    'total_debt'=>$input['total_debt'],
                    'day'=>$day_max + 1,
                    'customer_id'=>$customer->id,
                    'created_at'=>date('Y-m-d'),
                    'updated_at'=>date('Y-m-d'),
                ]);
        }
        return true;
    }
}
