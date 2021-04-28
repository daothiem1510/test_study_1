<?php

namespace App\Http\Middleware;

use App\Work;
use Closure;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use App\User;
use Illuminate\Support\Facades\DB;

class Admin {

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next) {

        $current_route = $request->route()->getName();
        if (strpos($current_route, 'create') !== false) {
            $parent_route = str_replace('create', 'index', $current_route);
            $method = 'create';
        } elseif (strpos($current_route, 'edit_profile') !== false) {
            $parent_route = str_replace('edit_profile', 'index', $current_route);
            $method = 'edit_profile';
        } elseif (strpos($current_route, 'repairvehicle.edit_all') !== false) {
            $parent_route = str_replace('edit_all', 'index', $current_route);
            $method = 'index';
        } elseif (strpos($current_route, 'sales.edit') !== false) {
            $parent_route = str_replace('edit', 'index', $current_route);
            $method = 'index';
        }elseif (strpos($current_route, 'order_bill.edit') !== false) {
            $parent_route = str_replace('edit', 'index', $current_route);
            $method = 'index';
        } elseif (strpos($current_route, 'edit') !== false) {
            $parent_route = str_replace('edit', 'index', $current_route);
            $method = 'edit';
        } elseif (strpos($current_route, 'view') !== false) {
            $parent_route = str_replace('view', 'index', $current_route);
            $method = 'view';
        } elseif (strpos($current_route, 'check_safety.cost') !== false) {
            $parent_route = str_replace('cost', 'index', $current_route);
            $method = 'cost';
        } elseif (strpos($current_route, 'update_cost') !== false) {
            $parent_route = str_replace('update_cost', 'index', $current_route);
            $method = 'update_cost';
        } elseif (strpos($current_route, 'checkout') !== false) {
            $parent_route = str_replace('checkout', 'index', $current_route);
            $method = 'admin.driver.checkout';
        }
        else {
            $parent_route = null;
            $method = 'index';
        }

        if (!isset($_SESSION)) {
            session_start();
        }
        $level1 = array();
        $level2 = array();
        foreach ($_SESSION as $key => $item) {
            if (isset($item['route'])) {
                if ($item['route'] == $current_route) {
                    $level1 = array('route' => $item['route'], 'name' => $item['name']);
                } elseif (in_array($current_route, $item['list_route'])) {
                    $level1 = array('route' => $item['route'], 'name' => $item['name']);
                    $level2 = array('route' => $current_route, 'name' => trans('route.' . $parent_route));
                }
            }
        }
        if ($request->user()) {
            $staff_id = $request->user()->staff_id;
        }else {
            $staff_id = 0;
        }
        $url = str_replace(asset(''),'',\Illuminate\Support\Facades\URL::current());
        //check công việc quá hạn chưa hoàn thành
        $count_work = DB::table('work')->where('responsible_person_id',$staff_id)
            ->where('end_date','<',Carbon::now('Asia/Ho_Chi_Minh'))
            ->where('done','=',Work::UNFINISHED)->count();
        session(['count_work' => $count_work]);
        if (!is_null(Auth::user())) {
            if (Auth::user()->role_id <> User::ROLE_SUPERADMIN) {
                if ((!in_array($current_route, Auth::user()->role->route()) || $count_work >= 1) && $url != 'work') {
                    abort(403);
                }
            }
            if ($parent_route == null) {
                $parent_route = $current_route;
            }

            $all_user = \DB::table('user')->where('id', '<>', \Auth::user()->id)->where('id', '<>', 1)->get();
            if ($count_work >= 1) {
                $menu_product = [];
                $menu_order = [];
                $menu_customer = [];
                $menu_supplier = [];
                $menu_haulage = [];
                $menu_bank = [];
                $menu_payment = [];
                $menu_administrative = ['admin.work.index'];
                $menu_department = [];
            }else {
                $menu_product=['admin.product.index','admin.product_group.index','admin.category.index','admin.historyprice.index','admin.category.default_rice','admin.category_group.index'];
                $menu_order=['admin.order.index','admin.order_export.index','admin.cost_default.index','admin.partner.index','admin.delivery.index','admin.contract.index','admin.certification.index','admin.charge.index','admin.cost_region.index','admin.order.observe','admin.product.all','admin.order.createall','admin.order.processing','admin.delivery_report.index','admin.order.statistical_reason','admin.financial.index','admin.offer_dont_vat.index','admin.offer_price_supplier.index','admin.processing_order.index'];
                $menu_customer=['admin.customer.index','admin.quotation.index','admin.customer_category.index','admin.plan.index','admin.region.index','admin.contract.index','admin.project.index','admin.init.index','admin.customer.statistical','admin.customer_priority.index','admin.return_goods.index','admin.customer.ordered','admin.customer.contract','admin.contract_priority.index','admin.payment_request_customer.index'];
                $menu_supplier=['admin.order_supplier.create','admin.order_supplier.index','admin.discount_supplier.index','admin.big_order_supplier.create','admin.big_order_supplier.index','admin.supplier.index','admin.shipping.index','admin.contract_shipping.index','admin.oilsupplier.index','admin.agreement.index','admin.contract_experiment.index','admin.init.index','admin.shipping.statistical','admin.supplier.statistical','admin.oil_supplier.statistical','admin.material_supplier.statistical','admin.tire_supplier.statistical','admin.guarantee.index','admin.update_price.index','admin.support_region.index','admin.return_bonus.index', 'admin.total_weight.statistic', 'admin.price_history.index','admin.export_bill.index'];
                $menu_haulage=['admin.vehicle.view','admin.street.index','admin.vehicle.index','admin.mooc.index','admin.transport.index','admin.transport_schedule.index','admin.hire.index','admin.hired_driver.index','admin.check_safety.index','admin.check_item.index','admin.oil.index','admin.oil.statistical','admin.oil.oilprice','admin.order.statistic_region','admin.importoil.index','admin.exportoil.index','admin.oilhistory.index','admin.material.index','admin.material.statistical','admin.material.materialprice','admin.importmaterial.index','admin.exportmaterial.index','admin.materialhistory.index','admin.tire.index','admin.tire.statistical','admin.importtire.index','admin.exporttire.index','admin.driver.index','admin.transportsalery.index','admin.cost.index','admin.repairvehicle.index','admin.driver.checkout','admin.lower_costs.index'];
                $menu_bank =['admin.payment.index','admin.income_history.index','admin.expenses_history.index','admin.bank.index','admin.assets.index', 'admin.disbursement_record.index', 'admin.facility_agreement.index','admin.transaction.index','admin.debt_plan.index','admin.debt_plan_detail.index','admin.bankaccount.index','admin.moneyhistory.index','admin.expense.index','admin.transaction.expense','admin.bankaccount.statistics'];
                $menu_payment = ['admin.payment_personal.index','admin.payment_expenses.index','admin.payment_bank_request.index','admin.payment_partner_request.index','admin.paymentbank.index','admin.payment_send_stock.index','admin.payment_shipping.index','admin.paymentsupplier.index','admin.paymentoilsupplier.index','admin.paymentbank.index','admin.payment_partner.index','admin.payment_company.index','admin.payment_customer.index','admin.payment_staff.index','admin.payment_request_process.index'];
                $menu_administrative =['admin.role.index','admin.user.index','admin.role.show','admin.user.reset','admin.position.index','admin.report_work.index','admin.accrued_expenses.index','admin.accrued_expenses_type.index','admin.monthly_expenses.index','admin.salary.index','admin.work.index','admin.overtime.index','admin.staff.index','admin.email_template.index','admin.company.index','admin.department.index','admin.logapproved.index','admin.vacation.index','admin.stationery.index','admin.salary.show','admin.asset_company.index','admin.asset_company_suggest.index','admin.plan_task.index','admin.comment.index','admin.letter.index','admin.approved.history','admin.sign.index','admin.manage_people.index','admin.time_keep_detail.index'];
                $menu_department = ['admin.list_department.index'];
            }
            $count_message = \DB::table('messages')->where('is_read', '=', 0)->where('to', '=', \Auth::user()->id)->count();
            $menu_administrative_count = \Auth::user()->unreadNotifications()->whereIn('module',$menu_administrative)->count();
            $menu_order_count = \Auth::user()->unreadNotifications()->whereIn('module',$menu_order)->count();
            $menu_customer_count = \Auth::user()->unreadNotifications()->whereIn('module',$menu_customer)->count();
            $menu_supplier_count = \Auth::user()->unreadNotifications()->whereIn('module',$menu_supplier)->count();
            $menu_product_count = \Auth::user()->unreadNotifications()->whereIn('module',$menu_product)->count();
            $menu_haulage_count = \Auth::user()->unreadNotifications()->whereIn('module',$menu_haulage)->count();
            $menu_bank_count = \Auth::user()->unreadNotifications()->whereIn('module',$menu_bank)->count();
            $menu_payment_count = \Auth::user()->unreadNotifications()->whereIn('module',$menu_payment)->count();
            $menu_department_count = \Auth::user()->unreadNotifications()->whereIn('module',$menu_department)->count();
            \View::share(['count_work'=>$count_work,'menu_department_count'=>$menu_department_count,'menu_payment_count'=>$menu_payment_count,'menu_bank_count'=>$menu_bank_count,'menu_haulage_count'=>$menu_haulage_count,'menu_product_count'=>$menu_product_count,'menu_supplier_count'=>$menu_supplier_count,'menu_customer_count'=>$menu_customer_count,'menu_order_count'=>$menu_order_count,'menu_administrative_count'=>$menu_administrative_count,'menu_administrative'=>$menu_administrative,'menu_payment'=>$menu_payment,'menu_bank'=>$menu_bank,'menu_haulage'=>$menu_haulage,'menu_supplier'=>$menu_supplier,'menu_customer'=>$menu_customer,'menu_order'=>$menu_order,'menu_product'=>$menu_product,'menu_department'=>$menu_department,'all_user' => $all_user, 'count_message' => $count_message, 'current_route' => $current_route, 'parent_route' => $parent_route, 'method' => $method, 'level1' => $level1, 'level2' => $level2]);
            return $next($request);
        } else {
            return redirect()->route('login');
        }
    }

}
