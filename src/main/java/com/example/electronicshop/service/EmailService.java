package com.example.electronicshop.service;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.util.Map;
import java.util.Objects;

@Service
@AllArgsConstructor
@Slf4j
public class EmailService {
    private JavaMailSender mailSender;
    private Configuration configuration;
    final String VERIFY_TEMPLATE = "verify-template.ftl";
    final String ORDER_TEMPLATE = "order-template.ftl";
    final String FROM_EMAIL = "electronic133@gmail.com";
    final String TYPE_EMAIL = "text/html";
    final String TITLE_EMAIL_VERIFY = "Mã xác minh Electronic Store Website";
    final String TITLE_EMAIL_ORDER = "Xác nhận đơn hàng tại Electronic Store Website";

    public void sendEmail(String toEmail,
                          Map<String,Object> model,
                          MailType type) throws MessagingException, IOException, TemplateException {
        log.info(Thread.currentThread().getName()+ "- send email start");
        MimeMessage mimeMailMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMailMessage);
        Template template =null;
        configuration.setClassForTemplateLoading(this.getClass(), "/templates");
        if (type.equals(MailType.VetifyShop)) {
            template = configuration.getTemplate(VERIFY_TEMPLATE);
            model.put("title", TITLE_EMAIL_VERIFY);
        }
        else if (type.equals(MailType.OrderShop)){
            template = configuration.getTemplate(ORDER_TEMPLATE);
            model.put("title", TITLE_EMAIL_ORDER);
        }
        model.put("email", toEmail);
        String html = FreeMarkerTemplateUtils.processTemplateIntoString(Objects.requireNonNull(template),model);
        mimeMailMessage.setContent(html, TYPE_EMAIL);

        helper.setFrom(FROM_EMAIL);
        helper.setTo(toEmail);
        helper.setText(html,true);
        helper.setSubject((String) model.get("title"));

        mailSender.send(mimeMailMessage);
        log.info(Thread.currentThread().getName()+ "- send email end");
    }


}
