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

  $("#reviews ol li").each(function() {
    var idx;
    idx = $(this).index();
    return $(this).click(function() {
      var slide;
      $(this).siblings().removeClass("active");
      $(this).addClass("active");
      slide = $("#reviews ul li").get(idx);
      $(slide).prevAll().removeClass("right").addClass("left");
      $(slide).nextAll().removeClass("left").addClass("right");
      return $(slide).removeClass("left").removeClass("right");
    });
  });

  $("a[href='#order-presentation']").click(function() {
    $("#order").addClass("visible");
    return false;
  });

  $("#order .close").click(function() {
    $("#order").removeClass("visible");
    return false;
  });

  Mandrill = new mandrill.Mandrill("eryR6LS4JOYJiGZpkOjECw");

  sendMail = function(_arg, complete) {
    var email, message, name, params, phone;
    name = _arg.name, phone = _arg.phone, email = _arg.email, message = _arg.message;
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
    var email, message, name, phone;
    name = $(this).find("[name='name']").val();
    phone = $(this).find("[name='phone']").val();
    email = $(this).find("[name='email']").val();
    message = $(this).find("[name='message']").val();
    sendMail({
      name: name,
      phone: phone,
      email: email,
      message: message
    });
    return false;
  });

  $(window).scroll($.throttle(100, function() {
    if (window.scrollY > 100) {
      return $("#header").addClass("small");
    } else {
      return $("#header").removeClass("small");
    }
  }));

}).call(this);
