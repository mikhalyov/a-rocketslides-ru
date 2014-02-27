(function() {
  var Mandrill, sendMail;

  $("#clients a").each(function() {
    var a, url;
    a = $(this);
    url = "images/clients/" + (a.data('client')) + ".png";
    a.append("<img src='" + url + "'>");
    return a.attr("data-client", null);
  });

  $("#reviews ul li").each(function() {
    var li, logoUrl, photoUrl;
    li = $(this);
    photoUrl = "images/reviews/" + (li.data('client')) + "-photo.jpg";
    logoUrl = "images/reviews/" + (li.data('client')) + "-logo.png";
    li.css("background-image", "url(" + photoUrl + ")");
    return li.find(".person").css("background-image", "url(" + logoUrl + ")");
  });

  $("a[href='#order-presentation']").click(function() {
    var button;
    $("#order").addClass("visible");
    button = $(this).data("name");
    $("#order [type=submit]").attr("data-name", button).data("name", button);
    return false;
  });

  $("#order .close").click(function() {
    $("#order").removeClass("visible");
    return false;
  });

  $("#header nav a").click(function() {
    var duration, scrollTop;
    scrollTop = $($(this).attr("href")).offset().top;
    duration = Math.abs(window.scrollY - scrollTop);
    $("html, body").bind("mousewheel DOMMouseScroll", function() {
      return false;
    });
    $("html, body").animate({
      scrollTop: scrollTop
    }, {
      duration: duration,
      complete: function() {
        return $("html, body").unbind("mousewheel DOMMouseScroll");
      }
    });
    return false;
  });

  Mandrill = new mandrill.Mandrill("eryR6LS4JOYJiGZpkOjECw");

  sendMail = function(_arg, complete) {
    var button, email, message, name, params, phone;
    name = _arg.name, phone = _arg.phone, email = _arg.email, message = _arg.message, button = _arg.button;
    params = {
      template_name: "request_presentation",
      template_content: [
        {
          name: "name",
          content: name
        }, {
          name: "phone",
          content: phone
        }, {
          name: "email",
          content: email
        }, {
          name: "message",
          content: message
        }, {
          name: "button",
          content: button
        }
      ],
      message: {
        to: [
          {
            email: "barbuzaster@gmail.com"
          }, {
            email: "launch@rocketslides.ru"
          }
        ]
      }
    };
    return Mandrill.messages.sendTemplate(params, function() {
      alert("Запрос отправлен!");
      $("#order").removeClass("visible");
      if (complete) {
        return complete();
      }
    });
  };

  $("form").submit(function() {
    var button, email, message, name, phone;
    name = $(this).find("[name='name']").val() || "";
    phone = $(this).find("[name='phone']").val() || "";
    email = $(this).find("[name='email']").val() || "";
    message = $(this).find("[name='message']").val() || "";
    button = $(this).find("[data-name]").data("name") || "";
    sendMail({
      name: name,
      phone: phone,
      email: email,
      message: message,
      button: button
    });
    return false;
  });

  $(window).scroll($.throttle(100, function() {
    var found;
    found = null;
    $("#header nav a").each(function() {
      if (window.scrollY > $($(this).attr("href")).offset().top - 100) {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        return found = true;
      }
    });
    if (!found) {
      $("#header nav a").removeClass("active");
    }
    if (window.scrollY > 100) {
      return $("#header").addClass("small");
    } else {
      return $("#header").removeClass("small");
    }
  }));

}).call(this);
