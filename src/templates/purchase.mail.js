const purchaseMail = `<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Purchase Confirmation #12345</title>
  </head>
  <body
    style="
      background-color: #f2f2f2;
      padding: 20px;
      font-family: Arial, sans-serif;
    "
  >
    <table style="width: 100%">
      <tr>
        <td>
          <p>Dear,</p>
          <p>
            We are writing to inform you that your purchase with order number
            #12345 has been successfully processed.
          </p>
          <p>
            Thank you for your purchase and we hope you enjoy your product. If
            you have any questions or concerns, feel free to contact us.
          </p>
          <p>Sincerely,<br />My E-commerce</p>
          <p>
            <em
              >Note: This email is generated automatically, please do not reply.
            </em>
          </p>
        </td>
      </tr>
      <tr>
        <td style="text-align: center">
          <p style="color: #333; font-size: 14px">
            Copyright © 2023 All rights reserved
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

module.exports = purchaseMail;
