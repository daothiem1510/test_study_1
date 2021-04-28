<?php

namespace App\Helpers;
use Illuminate;

class MailHelper {

    public static function sendEmail($data, $view_data, $to_email, $subject) {
        $shared_config = \App\Config::find(1);
        $config = ['to_email' => $to_email, 'subject' => $subject,'brand_name'=>$shared_config->brand_name];
        return \Mail::send($view_data, $data, function($message) use($config) {
                    $message->to($config['to_email'], $config['brand_name'])->subject($config['subject']);
                });
    }

    public static function vietnamese2html($str) {
        $cp = Array(
            "&#225;" => "á", "&#224;" => "à",
            "&#7843;" => "ả", "&#227;" => "ã",
            "&#7841;" => "ạ", "&#259;" => "ă",
            "&#7855;" => "ắ", "&#7857;" => "ằ",
            "&#7859;" => "ẳ", "&#7861;" => "ẵ",
            "&#7863;" => "ặ", "&#226;" => "â",
            "&#7845;" => "ấ", "&#7847;" => "ầ",
            "&#7849;" => "ẩ", "&#7851;" => "ẫ",
            "&#7853;" => "ậ", "&#233;" => "é",
            "&#232;" => "è", "&#7867;" => "ẻ",
            "&#7869;" => "ẽ", "&#7865;" => "ẹ",
            "&#234;" => "ê", "&#7871;" => "ế",
            "&#7873;" => "ề", "&#7875;" => "ể",
            "&#7877;" => "ễ", "&#7879;" => "ệ",
            "&#250;" => "ú", "&#249;" => "ù",
            "&#7911;" => "ủ", "&#361;" => "ũ",
            "&#7909;" => "ụ", "&#432;" => "ư",
            "&#7913;" => "ứ", "&#7915;" => "ừ",
            "&#7917;" => "ử", "&#7919;" => "ữ",
            "&#7921;" => "ự", "&#243;" => "ó",
            "&#242;" => "ò", "&#7887;" => "ỏ",
            "&#245;" => "õ", "&#7885;" => "ọ",
            "&#244;" => "ô", "&#7889;" => "ố",
            "&#7891;" => "ồ", "&#7893;" => "ổ",
            "&#7895;" => "ỗ", "&#7897;" => "ộ",
            "&#417;" => "ơ", "&#7899;" => "ớ",
            "&#7901;" => "ờ", "&#7903;" => "ở",
            "&#7905;" => "ỡ", "&#7907;" => "ợ",
            "&#237;" => "í", "&#236;" => "ì",
            "&#7881;" => "ỉ", "&#297;" => "ĩ",
            "&#7883;" => "ị", "&#253;" => "ý",
            "&#7923;" => "ỳ", "&#7927;" => "ỷ",
            "&#7929;" => "ỹ", "&#7925;" => "ỵ",
            "&#273;" => "đ", "&#193;" => "Á",
            "&#192;" => "À", "&#7842;" => "Ả",
            "&#195;" => "Ã", "&#7840;" => "Ạ",
            "&#258;" => "Ă", "&#7854;" => "Ắ",
            "&#7856;" => "Ằ", "&#7858;" => "Ẳ",
            "&#7860;" => "Ẵ", "&#194;" => "Â",
            "&#7844;" => "Ấ", "&#7846;" => "Ầ",
            "&#7848;" => "Ẩ", "&#7850;" => "Ẫ",
            "&#201;" => "É", "&#200;" => "È",
            "&#7866;" => "Ẻ", "&#7868;" => "Ẽ",
            "&#7864;" => "Ẹ", "&#202;" => "Ê",
            "&#7870;" => "Ế", "&#7872;" => "Ề",
            "&#7874;" => "Ể", "&#7876;" => "Ễ",
            "&#218;" => "Ú", "&#217;" => "Ù",
            "&#7910;" => "Ủ",
            "&#360;" => "Ũ", "&#7908;" => "Ụ",
            "&#431;" => "Ư", "&#7912;" => "Ứ",
            "&#7914;" => "Ừ", "&#7916;" => "Ử",
            "&#7918;" => "Ữ", "&#211;" => "Ó",
            "&#210;" => "Ò", "&#7886;" => "Ỏ",
            "&#213;" => "Õ", "&#7884;" => "Ọ",
            "&#212;" => "Ô", "&#7888;" => "Ố",
            "&#7890;" => "Ồ", "&#7892;" => "Ổ",
            "&#7894;" => "Ỗ", "&#416;" => "Ơ",
            "&#7898;" => "Ớ", "&#7900;" => "Ờ",
            "&#7902;" => "Ở", "&#7904;" => "Ỡ",
            "&#205;" => "Í", "&#204;" => "Ì",
            "&#7880;" => "Ỉ", "&#296;" => "Ĩ",
            "&#7882;" => "Ị", "&#221;" => "Ý",
            "&#7922;" => "Ỳ", "&#7926;" => "Ỷ",
            "&#7928;" => "Ỹ", "&#7924;" => "Ỵ",
            "&#7862;" => "Ặ", "&#7852;" => "Ậ",
            "&#7906;" => "Ợ", "&#7878;" => "Ệ",
            "&#7896;" => "Ộ", "&#208;" => "Đ",
            "&#7920;" => "Ự"
        );
        $arrHtml = array();
        $arrVietnamese = array();
        foreach ($cp as $key => $val) {
            $arrHtml[] = $key;
            $arrVietnamese[] = $val;
        }

        return str_replace($arrVietnamese, $arrHtml, $str);
    }

    public static function sendPHPMail($to, $to_name, $subject, $message, $cc = '', $bcc = '') {
        $config = ['to'=>$to,'to_name'=>$to_name,'subject'=>$subject,'default_box'=>env('MAIL_DEFAULT_BOX')];

        return \Mail::send('backend.emails.default', ['html' => $message], function($message) use($config) {
                    $message->from('trangkhanhgroup74@gmail.com', 'Trang Khanh Group');
                    $message->to($config['to'], $config['to_name'])->subject($config['subject']);
                });
    }
    public static function sendPHPMailQuotation($to, $to_name, $subject, $message, $pathToFile = '', $cc = '', $bcc = '') {
        $config = ['to'=>$to,'to_name'=>$to_name,'subject'=>$subject,'default_box'=>env('MAIL_DEFAULT_BOX')];

        return \Mail::send('backend.emails.default', ['html' => $message], function($message) use($config, $pathToFile, $cc, $bcc) {
                    $message->from('trangkhanhgroup74@gmail.com', 'Trang Khanh Group');
                    if (is_array($pathToFile)) {
                        $files = '';
                        foreach ($pathToFile as $v) {
                            $message->attach(public_path().'/' .ltrim($v, '/'), []);
                        }

                    } elseif ($pathToFile) {
                        $pathToFile = public_path() .$pathToFile;
                        $message->attach($pathToFile, []);

                    }
                    if ($cc) $message->cc($cc);
                    if ($bcc) $message->bcc($bcc);
                    $message->to($config['to'], $config['to_name'])->subject($config['subject']);
                });
    }

}
