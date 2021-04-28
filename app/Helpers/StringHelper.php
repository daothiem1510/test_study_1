<?php

namespace App\Helpers;

use App\PaymentExpenses;
use App\PaymentRequest;
use App\ShippingUnit;
use Illuminate\Support\Facades\DB;

class StringHelper {

    public static function getSelectBankOptions1($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            if (!is_null($option->company_id) && !is_null($option->bank_id) ){
                $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . ($option->bank?$option->bank->name:'') . ' - ' . ($option->company?$option->company->name:'') . ' - ' . $option->account_number . '</option>';
                }
            }
        return $html;
    }
    public static function getSelectRepresenterOption($options, $selected ='') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->name . ' - ' . $option->position . ' </option>';
        }
        return $html;
    }
    public static function getSelectBankOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->name . ' - ' . $option->bank . ' - ' . $option->account_number . '</option>';
        }
        return $html;
    }
    public static function getSelectBankOptions_2($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->account_number . '' . $option->name . ' - ' . $option->bank->name . '</option>';
        }
        return $html;
    }
    public static function getSelectPlanOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option data-user="'.$option->user_id.'" value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->name . ' - '. $option->user->name  . '</option>';
        }
        return $html;
    }

    public static function getAddressProjects($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->type . ' - ' . $option->house_number . ', ' . $option->commune->name . ', ' . $option->district->name . ', ' . $option->city->name . '</option>';
        }
        return $html;
    }

    public static function getSelectAccountOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->type . ' - ' . $option->account_number .' - '. $option->company->code . '</option>';
        }
        return $html;
    }

    public static function getBankAccountOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->account_number . ' - '. $option->bank . '</option>';
        }
        return $html;
    }
    public static function getSelectSendStockOptions($options, $selected = ''){
        $html = '<option></option>';
        foreach ($options as $option) {
            if(count($option->exportwarehouse) > 0){
                $weight = 0;
                foreach($option->exportwarehouse as $key=>$val){
                    $weight += $val->detail()->sum('weight');
                }
                if( $weight < $option->detail()->sum('weight')){
                    $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->company->name . ' - '. $option->customer->name . '-'.$option->indenture->code.'</option>';
                }
            }else{
                    $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->company->name . ' - '. $option->customer->name . '-'.$option->indenture->code.'</option>';
            }
        }
        return $html;
    }
    public static function getSelectOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->name . '</option>';
        }
        return $html;
    }

    public static function getSelectStaffOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->full_name . '</option>';
        }
        return $html;
    }
    public static function getSelectReminderOptions($options, $selected = ''): string
    {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->content_reminder . '</option>';
        }
        return $html;
    }
    public static function getSelectOfferDontVatOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->customer->name . ' - '.$option->user->name.' - '.self::number_format($option->total_money).'</option>';
        }
        return $html;
    }
    public static function getSelectChangeWarehouseOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->company->name . ' - '.date('d-m-Y',strtotime($option->date)).' - từ kho '.$option->warehouseFrom->name.' - đến '.$option->warehouseTo->name.'</option>';
        }
        return $html;
    }
    public static function getSelectRequestChangeWarehouseOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>'.date('d-m-Y',strtotime($option->created_at)).' - ' . $option->vehicle->license_plate . ' - '.$option->positionStock->name.'</option>';
        }
        return $html;
    }
    public static function getSelectTypeOptions($options, $selected = ''): string
    {
        $html = '<option></option>';
        foreach ($options as $key => $option) {
            $html .= '<option value="' . $key . '"' . ((is_array($selected) ? in_array($key, $selected) : $selected == $key) ? 'selected' : '') . '>' . $option. '</option>';
        }
        return $html;
    }
    public static function getSelectOptionsTransportSalary($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->name .'-'.$option->vehicle->license_plate. '</option>';
        }
        return $html;
    }
    public static function getSelectProjectCustomerOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            if ($option->customer) {
                $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->name . '-'.$option->customer->name.'</option>';
            }
        }
        return $html;
    }
    public static function getPresenterOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $key=>$option) {
            $html .= '<option value="' . $option->id . '"' . ($selected == ''?($key==0?'selected':''):((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '')) . '>' . $option->name . '</option>';
        }
        return $html;
    }
    public static function getSelectOptionsReceiver($options,$selected = ''){
        $html = '<option></option>';
        foreach ($options as $option) {
            if ($option->name != null){
                $html .= '<option value="' . $option->id . '-'.$option->type.'"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->name . '</option>';
            }elseif ($option->full_name){
                $html .= '<option value="' . $option->id . '-'.$option->type.'"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->full_name . '</option>';
            }
        }
        return $html;
    }

    public static function getBillNumberOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
             $html .= '<option data-value="'.$option->total_bill.'" value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->bill_number. ' - '. date('d/m/Y', strtotime($option->bill_date)). ' - '.number_format($option->total_bill) . ' VNĐ</option>';
        }
        return $html;
    }
    public static function getSelectTransaction($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->contract_code . '</option>';
        }
        return $html;
    }
    public static function getSelectTransactions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->contract_code . ' - ' . number_format($option->money) . ' - ' .date('d/m/Y',strtotime($option->created_at)) . '</option>';
        }
        return $html;
    }
    public static function getTransaction($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $created_at = date('d/m/Y', strtotime($option->created_at));
            $expiry_date = date('d/m/Y', strtotime($option->expiry_date));
            $remaining = ($option->money - $option->checkout_money);
            $money = ($option->money);
            $html .= '<option data-remaining="'. $remaining .'" data-expiry="'.$expiry_date.'" data-created="'.$created_at.'" value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->contract_code. ' - Tiền vay: ' . number_format($money). ' VND - TK vay: '.$option->loan_account.'</option>';
        }
        return $html;
    }

    public static function getAgreementOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->code . '</option>';
        }
        return $html;
    }

    public static function getExportStockOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->code. '-'. $option->vehicle->license_plate . '</option>';
        }
        return $html;
    }

    public static function getSelectSupplierOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . (($option->code) ? $option->code . ' - ' : '') . $option->name . '</option>';
        }
        return $html;
    }
    public static function getSelectExportStockOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . (($option->code) ? $option->code . ' - ' : '') . '</option>';
        }
        return $html;
    }

    public static function getPaymentExpenses($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $created_at = date('d/m/Y', strtotime($option->created_at));
            if($option->type == PaymentExpenses::TYPE_SUPPLIER_PRODUCT){
                $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->company->name. ' - ' .$option->supplier->name . ' - '.number_format($option->money_total). ' - '. $option->content . ' - Ngày tạo: '. $created_at.'</option>';
            }
            elseif($option->type == PaymentExpenses::TYPE_SUPPLIER_TRANSPORT){
                $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->company->name. ' - ' .$option->shippingUnit->name . ' - '.number_format($option->money_total). ' - '. $option->content . ' - Ngày tạo: '. $created_at.'</option>';
            }
            elseif($option->type == PaymentExpenses::TYPE_SUPPLIER_OIL){
                $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->company->name. ' - ' .$option->oilSupplier->name . ' - '.number_format($option->money_total). ' - '. $option->content . ' - Ngày tạo: '. $created_at.'</option>';
            }
        }
        return $html;
    }
    public static function getPaymentExpensesInTransaction($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $created_at = date('d/m/Y', strtotime($option->created_at));
            if ($option->type == PaymentExpenses::TYPE_SUPPLIER_PRODUCT){
                $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>'.number_format($option->money_total). ' - '. $option->content . ' - Ngày tạo: '. $created_at.'</option>';
            }
            else {
                $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' .number_format($option->money_total). ' - '. $option->content . ' - Ngày tạo: '. $created_at.'</option>';
            }
        }
        return $html;
    }

    public static function getFacilityAgreement($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option data-money="'.$option->money.'" data-interest="'.$option->interest.'" value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->code. ' - ' .$option->bank->name. ' - ' . $option->company->name . '</option>';
        }
        return $html;
    }

    public static function getSelectProjectOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->name . '</option>';
        }
        return $html;
    }
    public static function getSelectProject($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->project . '"' . ($selected ==$option->project  ? 'selected' : '') . '>' . $option->project . '</option>';
        }
        return $html;
    }

    public static function getSelectTransportOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->street->name . ' ( Ngày ' . date("d/m/Y", strtotime($option->date)) . ' )' . '</option>';
        }
        return $html;
    }

    public static function getSelectTransport($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->street->name . ' ( Ngày ' . date("d/m/Y", strtotime($option->date)) . ' )' . (($option->street) ? (' - ' . $option->street->km . ' km') : ' ') .'-'.$option->vehicle->license_plate.'</option>';
        }
        return $html;
    }

    public static function getTransportOptionss($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->street->name . ' ( Ngày ' . date("d/m/Y", strtotime($option->date)) . ' )' . ' - ' . $option->code .'-'.$option->vehicle->license_plate.'</option>';
        }
        return $html;
    }
    public static function getTransportOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->street->name . ' ( Ngày ' . date("d/m/Y", strtotime($option->date)) . ' )' . ' - ' . $option->code .'</option>';
        }
        return $html;
    }

    public static function getSelectVehicleOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->license_plate . '</option>';
        }
        return $html;
    }
    public static function getSelectOutStockSupplier($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $quantity = DB::table('stock')->where('out_stock_supplier_id',$option->id)->sum('weight');
            $text = '';
            foreach ($option->detail as $detail) {
                $text .= '-'. $detail->product->code;
            }
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->vehicle->license_plate . ' - '.$option->warehouse->name.' - '.date('dmY',strtotime($option->date_export)). $text. ' - ' . self::number_format($quantity) .'</option>';
        }
        return $html;
    }
    public static function getSelectVehicleOption($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            if ($option) {
                $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->vehicle->license_plate . '-' . $option->staff->full_name . '</option>';
            }
        }
        return $html;
    }

    public static function getSelectMoocOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->number . '</option>';
        }
        return $html;
    }

    public static function getSelectTireOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->seri . '</option>';
        }
        return $html;
    }
    public static function getSelectTireVehicleOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->position . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->seri . '-vt'.$option->position.'</option>';
        }
        return $html;
    }
    public static function getSelectCustomerOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $category = implode(' , ', $option->customercate()->pluck('name')->toArray());
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->name . '</option>';
        }
        return $html;
    }

    public static function getSelectStaffOption($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->full_name . ' - ' . $option->code . '</option>';
        }
        return $html;
    }
    public static function getSelectAssetCompanyOption($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->name . ' - '.'Số lượng còn:'. $option->newQuantity . '</option>';
        }
        return $html;
    }
    public static function getSelectAccruedExpenses($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->name.'</option>';
        }
        return $html;
    }

    public static function getSelectEterket($options) {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . '>' . $option->eterket . '</option>';
        }
        return $html;
    }
    public static function getSelectEterket2($options) {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . '>' . $option->eterket . ' - '.$option->product->code.' - '.$option->category->name.' lượng - '.$option->weight.' - bó '.$option->quantity_sb.' - cây '.$option->quantity_sc.'</option>';
        }
        return $html;
    }

    public static function getStockOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option data-weight = '.$option->weight.' value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->eterket . '-'.$option->id.'-'.$option->supplier->code.' - '.$option->weight.'</option>';
        }
        return $html;
    }

    public static function getEterketOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->eterket . '"' . ((is_array($selected) ? in_array($option->eterket, $selected) : $selected == $option->eterket) ? 'selected' : '') . '>' . $option->eterket . '</option>';
        }
        return $html;
    }

    public static function getSelectAgreementOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->code . '</option>';
        }
        return $html;
    }

    public static function getSelectContractOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->code . '</option>';
        }
        return $html;
    }

    public static function getSelectProductOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->code . '</option>';
        }
        return $html;
    }
    public static function getSelectCategoryOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->name . ' - '.($option->parents ? $option->parents->name : '').'</option>';
        }
        return $html;
    }

    public static function getSelectUserOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->name . ' - ' . $option->position->name . '</option>';
        }
        return $html;
    }
    public static function getSelectUserOption($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->name . '</option>';
        }
        return $html;
    }
    public static function getSelectUser($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            if ($option->staff) {
                $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->staff->full_name .' - '. $option->staff->phone .'</option>';

            }
        }
        return $html;
    }
    public static function getSelectOrderSupplier($options,$selected = ''){
        $html = '<option></option>';
        foreach ($options as $option) {
            if($option->order){
                $html .= '<option value="'.$option->id.'"'.((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') .'>'.$option->order->code.'</option>' ;

            }
        }
        return $html;
    }

    public static function getSelectOrderOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->code . ' - ' . $option->customer->name. ' - '. $option->project->name . '</option>';
        }
        return $html;
    }
    public static function getSelectOrderCode($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->order_code . ' - ' . $option->customer->name. ' - '. $option->project->name . '</option>';
        }
        return $html;
    }
    public static function getSelectProductCategory($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '">' . $option->product->code . ' - ' . $option->category->name. '</option>';
        }
        return $html;
    }
    public static function getSelectOrderOption($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->code .'</option>';
        }
        return $html;
    }

    public static function getVehicleOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->license_plate . ' - ' . $option->tonnage . ' kg' . '</option>';
        }
        return $html;
    }

    public static function getVehicleSelect($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            if( $option->driver && in_array($option->shipping_unit_id, ShippingUnit::OUR_SHPPING_UNIT)){
                $name = $option->driver->staff->full_name;
            }else{
                $name='';
            }
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->license_plate . ' - ' . $option->tonnage . ' kg' . (!in_array($option->shipping_unit_id, ShippingUnit::OUR_SHPPING_UNIT) ? ' - Xe thuê - '.$option->driver->hired_driver : ' - '.$name) . '</option>';
        }
        return $html;
    }
    public static function getDriverVehicleSelect($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            if($option->vehicle != null){
                if( $option && in_array($option->vehicle->shipping_unit_id, ShippingUnit::OUR_SHPPING_UNIT)){
                    $name = $option->staff ? $option->staff->full_name:'';
                }else{
                    $name='';
                }
                $html .= '<option value="' . $option->vehicle->id . '"' . ((is_array($selected) ? in_array($option->vehicle->id, $selected) : $selected == $option->vehicle->id) ? 'selected' : '') . '>' . $option->vehicle->license_plate . ' - ' . $option->vehicle->tonnage . ' kg' . (!in_array($option->vehicle->shipping_unit_id, ShippingUnit::OUR_SHPPING_UNIT) ? ' - Xe thuê - '.$option->hired_driver : ' - '.$name) . '</option>';

            }
        }
        return $html;
    }

    public static function getSelectOption($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option['id'] . '"' . ((is_array($selected) ? in_array($option['id'], $selected) : $selected == $option['id']) ? 'selected' : '') . '>' . $option['name'] . '</option>';
        }
        return $html;
    }
    public static function getSelectTypeQuotation($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $key=>$option) {
            $html .= '<option value="' . $key . '"' . ((is_array($selected) ? in_array($key, $selected) : $selected) ? 'selected' : '') . '>' . $option . '</option>';
        }
        return $html;
    }
    public static function getBankSelectOption($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->name . '</option>';
        }
        return $html;
    }
    public static function getBankOptionInExpense($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '" ' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->name . '</option>';
        }
        $html .= '<option value="0">Tiền mặt</option>';
        return $html;
    }
    public static function getBankOptionInExpense0($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '" >' . $option->name . '</option>';
        }
        $html .= '<option value="0" selected>Tiền mặt</option>';
        return $html;
    }
    public static function getDebtPlanOption($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $date = date('d/m/Y', strtotime($option->date));
            $total = number_format($option->total);
            $html .= '<option value="' . $option['id'] . '"' . ((is_array($selected) ? in_array($option['id'], $selected) : $selected == $option['id']) ? 'selected' : '') . '>' . $date. ' - '. $total . '</option>';
        }
        return $html;
    }
    public static function getDebtPlanAccOption($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $date = date('d/m/Y', strtotime($option->debtPlanDetail->debtPlan->date));
            $total = number_format($option->money);
            $html .= '<option value="' . $option['id'] . '"' . ((is_array($selected) ? in_array($option['id'], $selected) : $selected == $option['id']) ? 'selected' : '') . '>' . $date. ' - '.$option->bank->name. ' - '.$option->bankAccount->account_number. ' - ' . $total .' - '. (($option->debtPlanDetail->payment_type == 1)?'Thanh toán khoản vay ngân hàng ':'Thanh toán tiền lãi ngân hàng '). $option->debtPlanDetail->bank->name .'</option>';
        }
        return $html;
    }
    public static function getDebtPlanDetailOption($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $date = date('d/m/Y', strtotime($option->debtPlan->date));
            $total = number_format($option->money);
            $html .= '<option value="' . $option['id'] . '"' . ((is_array($selected) ? in_array($option['id'], $selected) : $selected == $option['id']) ? 'selected' : '') . '>' . $date. ' - '.$option->bank->name. ' - '. (($option->payment_type == 1)?'Thanh toán khoản vay':'Thanh toán tiền lãi'). ' - ' . $total . '</option>';
        }
        return $html;
    }
    public static function getPartnerOption($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option['id'] . '"' . ((is_array($selected) ? in_array($option['id'], $selected) : $selected == $option['id']) ? 'selected' : '') . '>' . $option['name'] .' - '. $option['company_name'] . '</option>';
        }
        return $html;
    }
    public static function getProjectOption($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $name = (($option->customer)) ? $option->customer->code : ' ';
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->name  . ' - ' .$name. '</option>';
        }
        return $html;
    }
    public static function getAssetOption($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option data-money="'.$option['value'].'" value="' . $option['id'] . '"' . ((is_array($selected) ? in_array($option['id'], $selected) : $selected == $option['id']) ? 'selected' : '') . '>' . $option['name'] .' - '. $option->code . '</option>';
        }
        return $html;
    }

    public static function getSelectBankAccount($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->account_number . '</option>';
        }
        return $html;
    }
    public static function getSelectBankObject($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->account_number . ' - ' . $option->bank . '</option>';
        }
        return $html;
    }
    public static function getSelectBankAccountType($options, $selected = '') {
        $html = '<option></option>';
        $select_all = [1,2,3,4,5];
        foreach ($options as $key => $option) {
            $html .= '<option value="' . $key . '"' . ((is_array($selected) ? in_array($key, $select_all) : $selected == $key) ? 'selected' : '') . '>' . $option . '</option>';

            //$html .= '<option value="'.$key.'">'.$option.'</option>';
        }

        return $html;
    }
    public static function getStatusOption($options, $selected = '') {
        $html = '<option value="0">Chọn</option>';
        foreach ($options as $key => $option) {
            $html .= '<option value="' . $key . '"' . ((is_array($selected) ? in_array($key, $selected) : $selected == $key) ? 'selected' : '') . '>' . $option . '</option>';
        }
        return $html;
    }

    public static function getRequestTypeOption($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $key => $option) {
            $html .= '<option value="' . $key . '"' . ((is_array($selected) ? in_array($key, $selected) : $selected == $key) ? 'selected' : '') . '>' . $option . '</option>';
        }
        return $html;
    }
    public static function getTypeAccOption($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $key => $option) {
            $html .= '<option value="' . $key . '"' . ((is_array($selected) ? in_array($key, $selected) : $selected == $key) ? 'selected' : '') . '>' . $option . '</option>';
        }
        return $html;
    }

    public static function getStaffSelectOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->code . ' - ' . $option->full_name . '</option>';
        }
        return $html;
    }

    public static function getStaffCustomer($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option['id'] . '"' . ((is_array($selected) ? in_array($option['id'], $selected) : $selected == $option['id']) ? 'selected' : '') . '>' . $option['name'] . '</option>';
        }
        return $html;
    }

    public static function getStaffOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->staff_id . '"' . ((is_array($selected) ? in_array($option->staff_id, $selected) : $selected == $option->staff_id) ? 'selected' : '') . '>' . $option->staff_name . ' - ' . $option->staff_phone . '</option>';
        }
        return $html;
    }

    public static function getPaymentRequest2($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            if ($option->type == PaymentRequest::TYPE_STAFF) {
                $html .= '<option '.($option->expenseHistory?'disabled="disabled"':'').' value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->staff->full_name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) . '</option>';
            } elseif ($option->type == PaymentRequest::TYPE_SUPPLIER_TRANSPORT) {
                $html .= '<option '.($option->expenseHistory?'disabled="disabled"':'').' value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->shipping->name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) . '</option>';
            } elseif ($option->type == PaymentRequest::TYPE_CUSTOMER) {
                $html .= '<option '.($option->expenseHistory?'disabled="disabled"':'').' value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->customer->name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) . '</option>';
            } elseif ($option->type == PaymentRequest::TYPE_SUPPLIER_PRODUCT) {
                $html .= '<option '.($option->expenseHistory?'disabled="disabled"':'').' value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->supplier->name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) . '</option>';
            } elseif ($option->type == PaymentRequest::TYPE_SUPPLIER_OIL) {
                $html .= '<option '.($option->expenseHistory?'disabled="disabled"':'').' value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->oilSupplier->name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) . '</option>';
            }
            elseif ($option->type == PaymentRequest::TYPE_BANK){
                $html .= '<option '.($option->expenseHistory?'disabled="disabled"':'').' value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->companyReceiver->name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) . '</option>';
            }
        }
        return $html;
    }
    public static function getPaymentRequest($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            if ($option->type == PaymentRequest::TYPE_STAFF) {
                $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->staff->full_name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) . '</option>';
            } elseif ($option->type == PaymentRequest::TYPE_SUPPLIER_TRANSPORT) {
                $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->shipping->name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) . '</option>';
            } elseif ($option->type == PaymentRequest::TYPE_CUSTOMER) {
                $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->customer->name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) . '</option>';
            } elseif ($option->type == PaymentRequest::TYPE_SUPPLIER_PRODUCT) {
                $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->supplier->name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) . '</option>';
            } elseif ($option->type == PaymentRequest::TYPE_SUPPLIER_OIL) {
                $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->oilSupplier->name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) . '</option>';
            }
            elseif ($option->type == PaymentRequest::TYPE_BANK){
                $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->companyReceiver->name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) . '</option>';
            }
        }
        return $html;
    }
    public static function getPaymentRequestMobile($options, $id) {
        $html = '';
        foreach ($options as $option) {
            if ($option->type == PaymentRequest::TYPE_STAFF && $option->id == $id ) {
                $html .=  $option->staff->full_name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) ;
            } elseif ($option->type == PaymentRequest::TYPE_SUPPLIER_TRANSPORT && $option->id == $id) {
                $html .= $option->shipping->name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) ;
            } elseif ($option->type == PaymentRequest::TYPE_CUSTOMER && $option->id == $id) {
                $html .= $option->customer->name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) ;
            } elseif ($option->type == PaymentRequest::TYPE_SUPPLIER_PRODUCT && $option->id == $id) {
                $html .= $option->supplier->name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) ;
            } elseif ($option->type == PaymentRequest::TYPE_SUPPLIER_OIL && $option->id == $id) {
                $html .= $option->oilSupplier->name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) ;
            }
            elseif ($option->type == PaymentRequest::TYPE_BANK && $option->id == $id){
                $html .=$option->companyReceiver->name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) ;
            }
        }
        return $html;
    }

    public static function getPaymentBankRequest($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->company->name . ' - '. $option->bank->name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) . '</option>';
        }
        return $html;
    }
    public static function getPaymentPartnerRequest($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->company->name . ' - '. $option->partner->name .' ('. $option->partner->company_name . ') ' . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) . '</option>';
        }
        return $html;
    }
    public static function getPaymentCompanyRequest($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->company->name . ' - '. $option->companyReceiver->name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) . '</option>';
        }
        return $html;
    }

    public static function getPaymentCustomerRequest($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->company->name . ' - '. $option->customer->name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) . '</option>';
        }
        return $html;
    }
    public static function getPaymentStaffRequest($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->company->name . ' - '. $option->staff->full_name . ' - ' . date('d/m/Y', strtotime($option->created_at)) . ' - ' . $option->content . ' - ' . number_format($option->money_total) . '</option>';
        }
        return $html;
    }

    public static function getCategoryOptions($options, $selected = '') {
        $html = '<option ></option>';
        foreach ($options as $option) {
            $html .= '<optgroup label="' . $option->name . '">';
            if ($option->children) {
                foreach ($option->children as $val) {
                    $html .= '<option value="' . $val->id . '"' . ((is_array($selected) ? in_array($val->id, $selected) : $selected == $val->id) ? 'selected' : '') . '>' . $val->name . ' - ' . $option->name . '</option>';
                }
            }
        }
        return $html;
    }

    public static function getOrderOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
           if( $option->order!=null){
               $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->order->code?$option->order->code:"" . '</option>';
           }
        }
        return $html;
    }

    public static function getOrderSupplierOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . ($option->order ? $option->order->code : "Đơn đặt hàng nhà máy") . ' - ' . $option->supplier->name. ' - '. date('d-m-Y', strtotime($option->delivery_date)) . '</option>';
        }
        return $html;
    }
    public static function getSelectBigOrderSupplierOptions($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . ($option->order ? $option->order->code : "Đơn đặt hàng tổng") . ' - ' . $option->supplier->code. ' - '. date('d-m-Y', strtotime($option->delivery_date)). ' - '. number_format($option->detail()->sum('weight')) . ' kg</option>';
        }
        return $html;
    }

    public static function getOptionsHtml($options, $selected_id = 0) {
        $html = '<option></option>';
        foreach ($options as $val) {
            $html .= '<option value="' . $val['id'] . '" ' . ($selected_id == $val['id'] ? 'selected' : '') . '>' . $val['name'] . '</option>';
        }
        return $html;
    }
    public static function getOptionsHtmls($options) {
        $html = '<option></option>';
        foreach ($options as $val) {
            $html .= '<option value="' . $val['id'] . '">' . $val['name'] . '</option>';
        }
        return $html;
    }
    public static function getOptionsProjectHtml($options, $selected_id = 0) {
        $html = '<option></option>';
        foreach ($options as $val) {
            $html .= '<option value="' . $val['name'] . '">' . $val['name'] . ' - ' . $val['phone'] . '</option>';
        }
        return $html;
    }

    public static function convert_number($number) {
        $hyphen = ' ';
        $conjunction = ' ';
        $separator = ' ';
        $negative = 'âm ';
        $decimal = ' phẩy ';
        $dictionary = array(
            0 => 'không',
            1 => 'một',
            2 => 'hai',
            3 => 'ba',
            4 => 'bốn',
            5 => 'năm',
            6 => 'sáu',
            7 => 'bảy',
            8 => 'tám',
            9 => 'chín',
            10 => 'mười',
            11 => 'mười một',
            12 => 'mười hai',
            13 => 'mười ba',
            14 => 'mười bốn',
            15 => 'mười năm',
            16 => 'mười sáu',
            17 => 'mười bảy',
            18 => 'mười tám',
            19 => 'mười chín',
            20 => 'hai mươi',
            30 => 'ba mươi',
            40 => 'bốn mươi',
            50 => 'năm mươi',
            60 => 'sáu mươi',
            70 => 'bảy mươi',
            80 => 'tám mươi',
            90 => 'chín mươi',
            100 => 'trăm',
            1000 => 'nghìn',
            1000000 => 'triệu',
            1000000000 => 'tỷ',
            1000000000000 => 'nghìn tỷ',
            1000000000000000 => 'ngàn triệu triệu',
            1000000000000000000 => 'tỷ tỷ'
        );
        if (!is_numeric($number)) {
            return false;
        }

        if ($number < 0) {
            return $negative . StringHelper::convert_number(abs($number));
        }
        $string = $fraction = null;
        switch (true) {
            case $number < 21:
                $string = $dictionary[$number];
                break;
            case $number < 100:
                $tens = ((int) ($number / 10)) * 10;
                $units = $number % 10;
                $string = $dictionary[$tens];
                if ($units) {
                    $string .= $hyphen . $dictionary[$units];
                }
                break;
            case $number < 1000:
                $hundreds = $number / 100;
                $remainder = $number % 100;
                $string = $dictionary[$hundreds] . ' ' . $dictionary[100];
                if ($remainder) {
                    $string .= $conjunction . StringHelper::convert_number($remainder);
                }
                break;
            default:
                $baseUnit = pow(1000, floor(log($number, 1000)));
                $numBaseUnits = (int) ($number / $baseUnit);
                $remainder = fmod($number, $baseUnit);
                $string = StringHelper::convert_number($numBaseUnits) . ' ' . $dictionary[$baseUnit];
                if ($number % $baseUnit == 0) {
                    break;
                }
                if ($remainder) {
                    $string .= $remainder < 100 ? $conjunction : $separator;
                    $string .= StringHelper::convert_number($remainder);
                }
                break;
        }

        if (null !== $fraction && is_numeric($fraction)) {
            $string .= $decimal;
            $words = array();
            foreach (str_split((string) $fraction) as $number) {
                $words[] = $dictionary[$number];
            }
            $string .= implode(' ', $words);
        }
        return $string;
    }

    public static function slug($str) {
        $str = trim(mb_strtolower($str));
        $str = preg_replace('/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/', 'a', $str);
        $str = preg_replace('/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/', 'e', $str);
        $str = preg_replace('/(ì|í|ị|ỉ|ĩ)/', 'i', $str);
        $str = preg_replace('/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/', 'o', $str);
        $str = preg_replace('/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/', 'u', $str);
        $str = preg_replace('/(ỳ|ý|ỵ|ỷ|ỹ)/', 'y', $str);
        $str = preg_replace('/(đ)/', 'd', $str);
        $str = preg_replace('/[^a-z0-9-\s]/', '', $str);
        $str = preg_replace('/([\s]+)/', '', $str);
        $str = preg_replace('/---/', '', $str);
        return $str;
    }

    public static function removeVietnameseSign($str) {
        $str = preg_replace("/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/", 'a', $str);
        $str = preg_replace("/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/", 'e', $str);
        $str = preg_replace("/(ì|í|ị|ỉ|ĩ)/", 'i', $str);
        $str = preg_replace("/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/", 'o', $str);
        $str = preg_replace("/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/", 'u', $str);
        $str = preg_replace("/(ỳ|ý|ỵ|ỷ|ỹ)/", 'y', $str);
        $str = preg_replace("/(đ)/", 'd', $str);
        $str = preg_replace("/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/", 'A', $str);
        $str = preg_replace("/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/", 'E', $str);
        $str = preg_replace("/(Ì|Í|Ị|Ỉ|Ĩ)/", 'I', $str);
        $str = preg_replace("/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/", 'O', $str);
        $str = preg_replace("/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/", 'U', $str);
        $str = preg_replace("/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/", 'Y', $str);
        $str = preg_replace("/(Đ)/", 'D', $str);
        return $str;
    }

    public static function getAlias($str) {
        $str = strip_tags($str);
        $str = self::removeVietnameseSign($str);
        $allowed = "/[^A-Za-z0-9- ]/i";
        $str = preg_replace($allowed, '', $str);
        $str = trim($str);
        while (strpos($str, '  ') !== FALSE) {
            $str = str_replace('  ', ' ', $str);
        }
        $str = str_replace(' ', '-', $str);
        while (strpos($str, '--') !== FALSE) {
            $str = str_replace('--', '-', $str);
        }
        $str = strtolower($str);
        return $str;
    }

    public static function number_format($number) {
        $symbol_thousand = '.';
        $decimal_place = 0;
        $dec_point = ',';
        $number = number_format($number, $decimal_place, $dec_point, $symbol_thousand);
        return $number;
    }
    public static function getSelectOptionsStock($options, $selected = '') {
        $html = '<option></option>';
        foreach ($options as $option) {
            $html .= '<option value="' . $option->id . '"' . ((is_array($selected) ? in_array($option->id, $selected) : $selected == $option->id) ? 'selected' : '') . '>' . $option->product->code . ' - '.$option->category->name.'</option>';
        }
        return $html;
    }

}
