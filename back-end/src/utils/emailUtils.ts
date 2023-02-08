import sgMail from "@sendgrid/mail";

async function sendEmail(email: string, key: string) {
  if (process.env.NODE_ENV !== "test") {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL,
      subject: "Welcome to GaiaSenses! Confirm Your Email",
      text: "gaia senses",
      html: buildEmail(key),
    };
    let sent = false;
    await Promise.all([sgMail.send(msg)])
      .then(() => {
        console.log("Email sent");
        sent = true;
      })
      .catch((error) => {
        console.log(error.response.body);
      });
    return sent;
  }
  return true;
}

function buildEmail(key: string) {
  return `<div style="box-sizing:border-box;display:block;max-width:600px;margin:0 auto;padding:10px"><span style="color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;width:0">Let's confirm your email address.</span>
<div style="box-sizing:border-box;width:100%;margin-bottom:30px;margin-top:15px">
<table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%">
    <tbody>
        <tr>
            <td align="left" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:32px;vertical-align:top;text-align:left" valign="top"><span><a href="https://gaia-senses.vercel.app/" style="display:flex;justify-content:center!important;height:80px;box-sizing:border-box;color:#247eca;font-weight:700;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://u298828.ct.sendgrid.net/ss/c/aJrxWzXarbnB62JtyTgHZh5XEDz4JqqJLmJngDXkiXpa8CdQQXrR5w1RJMF523Kxc5pQ6xhO9Fo6qHd_0ukQlWO3pZUIAGKFT9zAfSiJzKzzFVMxvFZxCoDi0-0n4_Fc/3od/6Yaiw_flQxqLeGsyW5Z_qw/h0/ybly3nN_tHsf9g_KSg1RJpj-GXxsGjDmGWanW1PsZlc&amp;source=gmail&amp;ust=1659875410973000&amp;usg=AOvVaw0ABCswH60jalQhrRK-Uxc1"><img alt="SendGrid" height="80" src="https://gaia-senses.vercel.app/static/media/gs_logo.b3de6a33ae3ba367ea6a.png" style="max-width:100%;border-style:none;height:80px;width:80px" width="80" class="CToWUd" data-bit="iit"><p style="display:flex;align-items:center!important;height:80px;margin:0 20px;text-align:center;line-height:80px;justify-content:center">GaiaSenses</p></a></span></td>
        </tr>
    </tbody>
</table>
</div>

<div style="box-sizing:border-box;width:100%;margin-bottom:30px;background:#ffffff;border:1px solid #f0f0f0">
<table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%">
    <tbody>
        <tr>
            <td style="box-sizing:border-box;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding:30px" valign="top">
            <table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%">
                <tbody>
                    <tr>
                        <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">
                        <h2 style="margin:0;margin-bottom:30px;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;line-height:1.5;font-size:24px;color:#294661!important">You're on your way!<br>
                        Let's confirm your email address.</h2>

                        <p style="margin:0;margin-bottom:30px;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300">By clicking on the following link, you are confirming your email address.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">
                        <table cellpadding="0" cellspacing="0" style="box-sizing:border-box;border-spacing:0;width:100%;border-collapse:separate!important" width="100%">
                            <tbody>
                                <tr>
                                    <td align="center" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding-bottom:15px" valign="top">
                                    <table cellpadding="0" cellspacing="0" style="box-sizing:border-box;border-spacing:0;width:auto;border-collapse:separate!important">
                                        <tbody>
                                            <tr>
                                                <td align="center" bgcolor="#348eda" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;background-color:#348eda;border-radius:2px;text-align:center" valign="top"><a href="${process.env.SERVER_URL}/auth/activate?key=${key}" style="box-sizing:border-box;border-color:#348eda;font-weight:400;text-decoration:none;display:inline-block;margin:0;color:#ffffff;background-color:#348eda;border:solid 1px #348eda;border-radius:2px;font-size:14px;padding:12px 45px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://u298828.ct.sendgrid.net/ss/c/KeecV0-eUYdPWIcLaNcQIk8KHRb5oSkirDE8JL2zHb4DT2amuRfbCmDyrEfijZZx-q8SV-BZvjVb5zbFuI5h3Tp9xLc9tUaDTYw0KDyrUWkNkcnvczwUpGb7vnTY-3aoM4kqQAvN09rNxQRW0Z54_KwYbhV-_iiya3B150sy29zINS4mMipKZ2a8oiZ_75QqOlbB_doCJXuLVtxkOHQkuw/3od/6Yaiw_flQxqLeGsyW5Z_qw/h1/owouLhHHpnXBkUDMCl5ntCzKiKBF_-c5anoeAc9Pn6k&amp;source=gmail&amp;ust=1659875410974000&amp;usg=AOvVaw16eEwo5-7oYHclnJMI4rlq">Confirm Email Address</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            </td>
        </tr>
    </tbody>
</table>
</div>

<div style="box-sizing:border-box;clear:both;width:100%">
<table style="box-sizing:border-box;width:100%;border-spacing:0;font-size:12px;border-collapse:separate!important" width="100%">
    <tbody>
        <tr style="font-size:12px">
            <td align="center" style="box-sizing:border-box;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;vertical-align:top;font-size:12px;text-align:center;padding:20px 0" valign="top"><span style="float:none;display:block;text-align:center"><a href="https://gaia-senses.vercel.app/" style="box-sizing:border-box;color:#348eda;font-weight:400;text-decoration:none;font-size:12px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://u298828.ct.sendgrid.net/ss/c/aJrxWzXarbnB62JtyTgHZh5XEDz4JqqJLmJngDXkiXpa8CdQQXrR5w1RJMF523Kxc5pQ6xhO9Fo6qHd_0ukQlWO3pZUIAGKFT9zAfSiJzKzzFVMxvFZxCoDi0-0n4_Fc/3od/6Yaiw_flQxqLeGsyW5Z_qw/h2/lM4R8HI7jfvyLD1pFQZmRqJizvnL_9PClIQ9YmOiT5g&amp;source=gmail&amp;ust=1659875410974000&amp;usg=AOvVaw2gkMjYtNTYggGpGJqp7zDm"><img alt="GaiaSenses" height="41" src="https://gaia-senses.vercel.app/static/media/gs_logo.b3de6a33ae3ba367ea6a.png" style="max-width:100%;border-style:none;font-size:12px;height:41px;width:41px" width="41" class="CToWUd" data-bit="iit"></a></span>

            <p style="color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;margin-bottom:5px;margin:10px 0 20px">Send with Confidence</p>

            <p style="margin:0;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;font-size:12px;margin-bottom:5px">© GaiaSenses Inc. SP, Brazil</p>

            <p style="margin:0;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;font-size:12px;margin-bottom:5px"><a href="https://sites.google.com/view/gaia-senses" style="box-sizing:border-box;color:#348eda;font-weight:400;text-decoration:none;font-size:12px;padding:0 5px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://u28349565.ct.sendgrid.net/ls/click?upn%3DBxJCsZvZe1-2B3wsJ0k2XMLyjiOCC8pZBtqmKw772Mm-2BRw4EmsqjsTJ1-2BQV5tqFJf4DBhjOP49kE5aUqcveyOoQh8ahK7GLQVO3W9tGS-2BvX4H-2BA-2BCDknJyoSnwn6-2BkLYiBurCu4zaBuEJA1Iv6mB2yyiC6KI-2FMbq0-2FB6MSdMlRRh6KcZfHPT8UeDRDnrtVfd7S2xn7VlyY1STBuHTl6tPxG1p2r-2Fvl6fDXZZvpnBPEBJ4BSRjb3Sllu9T7E29PdtHrvYtv5ApA2hDp9NKSl0fYTU-2BdpbcMjv7QKhUvnBqGaQzbXyf9nlka2eb2DZBFua2X2cGmv-2BDxuW4Ip4oEpRkfEw-3D-3Dsm2G_x9-2BkTYfDeSth96HzxduZ-2BRAh3sFvrF75NQiOmNNJPgqwgqU5o5IWnv4FlWlXM4EpHXFt8BcyjSuIyIzdidjlakTAtcvLsJG-2BNVP0L6KIObU2gVPjl7DAR4VLxjZDeGUkWNoK9SHDFPZpK9rktuh7bBCWGTWiMZWaOP2qeNgGKSiuHCAe4DAP63hyonDf76mNJscCl-2FTSr431-2FDrzPbWn5LPsWp-2F9P7M72RVuwdkK7MY-3D&amp;source=gmail&amp;ust=1659878377174000&amp;usg=AOvVaw3_c9TCDIdzD3KvxeFIeg82">Blog</a> <a href="https://github.com/RuYi-Shen/GaiaSenses" style="box-sizing:border-box;color:#348eda;font-weight:400;text-decoration:none;font-size:12px;padding:0 5px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://u298828.ct.sendgrid.net/ss/c/poE2veomcy6ylfr_Ro2nmJBxBtdj2jlD_pc-sebDocM8ko394IziGpDMpT4ZGZ-LEXGBGghf9N-ccSv89MC78imVixiLg8UAB6hsAS5MebJefIHn_46zAm7CkA9251kmZMmPuc7tl3LQ2PZKCucmIA/3od/6Yaiw_flQxqLeGsyW5Z_qw/h4/mNyIBpd6TXXEcpP1rxxJDMxVVTs_OkpcvcMtDBW07-U&amp;source=gmail&amp;ust=1659875410974000&amp;usg=AOvVaw3pIiTRrlJyJnf4IrXsI8xq">GitHub</a></p>
            </td>
        </tr>
    </tbody>
</table>
</div>
</div>`;
}

export const emailUtils = {
  sendEmail,
};
