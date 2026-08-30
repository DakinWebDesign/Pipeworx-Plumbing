document.addEventListener('DOMContentLoaded', function () {
  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sticky header shadow on scroll
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav toggle (dropdown)
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', function () {
    mainNav.classList.toggle('open');
  });
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('open');
    });
  });

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(function (el) { observer.observe(el); });

  // Testimonial spotlight slider
  var slides = Array.prototype.slice.call(document.querySelectorAll('.t-slide'));
  var dotsWrap = document.getElementById('tDots');
  var prevBtn = document.getElementById('tPrev');
  var nextBtn = document.getElementById('tNext');
  var current = 0;
  var timer;

  if (slides.length && dotsWrap) {
    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', 'Show review ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function nextSlide() { goTo(current + 1); }
    function prevSlide() { goTo(current - 1); }

    function startAuto() {
      timer = setInterval(nextSlide, 6500);
    }
    function stopAuto() {
      clearInterval(timer);
    }

    nextBtn.addEventListener('click', function () { nextSlide(); stopAuto(); startAuto(); });
    prevBtn.addEventListener('click', function () { prevSlide(); stopAuto(); startAuto(); });

    var tWrap = document.querySelector('.t-wrap');
    tWrap.addEventListener('mouseenter', stopAuto);
    tWrap.addEventListener('mouseleave', startAuto);

    startAuto();
  }

  // Contact form -> mailto (static site, no backend)
  var form = document.getElementById('quoteForm');
  var successMsg = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstName = document.getElementById('firstName').value.trim();
      var lastName = document.getElementById('lastName').value.trim();
      var email = document.getElementById('email').value.trim();
      var phone = document.getElementById('phone').value.trim();
      var service = document.getElementById('service').value;
      var message = document.getElementById('message').value.trim();

      var subject = 'Quote Request from ' + firstName + ' ' + lastName;
      var bodyLines = [
        'Name: ' + firstName + ' ' + lastName,
        'Phone: ' + phone,
        'Email: ' + (email || 'Not provided'),
        'Service: ' + (service || 'Not specified'),
        '',
        'Message:',
        message || '(none)'
      ];
      var mailto = 'mailto:pipeworxplumbingltd@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(bodyLines.join('\n'));

      window.location.href = mailto;
      successMsg.classList.add('show');
      form.reset();
    });
  }
});
