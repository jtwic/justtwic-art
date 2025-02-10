<?php
   header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
   header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
   header('Access-Control-Allow-Credentials: true');
   header('Access-Control-Allow-Origin: http://newhope.justtwic.art/', false);

   $data  =  json_decode ( file_get_contents ( 'php://input' ),  true );

   $email   = $data['email'];
   $body    = $data['message'];

   $subject_mail = "=?utf-8?B?".base64_encode("🔥 Заявка на обратную связь с justtwic.art")."?=";

   $address =  "illyadeveloper@gmail.com";

   $message = '<html><body style="background-color:#89defa8c; padding: 28px 24px;">';
   $message .= '<h3 style="margin:0 0 20px; padding: 10px 24px; font-size:24px; letter-spacing:1px; line-height:1.4; background: white; color:#FF6A95; border-radius: 30px;">Информация о клиенте</h3>';
   $message .= '<table rules="all" style="table-layout: fixed; width:100%; font-size:15px; border:2px solid #ffffff; background:#ffffff;border-radius:16px;box-sizing:initial;overflow:hidden;border-collapse:separate;" cellpadding="10 16" cellspacing="0">';
//    $message .= "<tr><td style='background: #f9f9f9; max-width: 160px; width: 90px; padding:16px 24px; white-space: nowrap;'><strong style='color:#373437;'>Имя клиента:</strong></td><td style='color:#333333;letter-spacing:0.5px;line-height: 180%;'>" . $name  . "</td></tr>";
   $message .= "<tr><td style='background: #f9f9f9; max-width: 160px; width: 90px; padding:16px 24px; white-space: nowrap;'><strong style='color:#373437;'>E-mail:</strong> </td><td style='color:#333333;letter-spacing:0.5px;line-height: 180%;'>" . $email . "</td></tr>";
//    $message .= "<tr><td style='background: #f9f9f9; width: 160px; padding:16px 24px; white-space: nowrap;'><strong style='color:#373437;'>Tема Обращения:</strong></td><td style='color:#333333;letter-spacing:0.5px;line-height: 180%;'>" . $sub  . "</td></tr>";
   $message .= "<tr><td style='background: #f9f9f9; max-width: 160px; width: 120px; padding:16px 24px; white-space: nowrap;'><strong style='color:#373437;'>Сообщение:</strong> </td><td style='color:#333333;letter-spacing:0.5px;line-height: 1.15;'>" .  $body . "</td></tr>";
   $message .= "</table>";
   $message .= "</body></html>";

// $headers = "From: $email \r\n Reply-to: $email\r\n Content-type:text/html; charset = UTF-8\r\n";
   $send = mail ($address, $subject_mail, $message,"From: $email\r\nReply-to: $email\r\nContent-type:text/html; charset = UTF-8\r\n");

	if ($send) //проверяем, отправилось ли сообщение
		echo "Сообщение отправлено успешно!";
	else
		echo "Ошибка, сообщение не отправлено! Возможно, проблемы на сервере";
?>
