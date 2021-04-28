<?php

namespace App\Imports;

use App\Position;
use App\Staff;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStartRow;

class StaffImport implements ToModel, WithHeadings, WithStartRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {

        if ($row[5] == 'Nam')
            $row[5] = 1;
        else
            $row[5] = 2;
        $position = DB::table('position')->where('name','like',$row[6])->first();
        if (!is_null($position))
        {
            $row[6] = $position->id;
        }
        else{
            $pos = new Position;
            $pos->name = $row[6];
            $pos->status = '1';
            $pos->created_at = date("Y-m-d H:i:s");
            $pos->updated_at = date("Y-m-d H:i:s");
            $pos->save();

            $row[6] = $pos->id;
        }
        return new Staff([
            'full_name'     => $row[1],
            'dob'    => $row[4].'-'.$row[3].'-'.$row[2],
            'gender' => $row[5],
            'position_id'    => $row[6],
            'phone'    => $row[7],
            'email' => $row[8],
            'address' => $row[9],
            'status' => '1',
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ]);
    }
    public function headings(): array
    {
        return [3, 4];
    }
    public function startRow(): int
    {
        return 5;
    }

}
