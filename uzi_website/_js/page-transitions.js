// made by uzi
const fadeDuration = 600;


document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;


  const wrapper = document.createElement('div');
  wrapper.id = 'page-wrapper';
  while (body.firstChild) {
    wrapper.appendChild(body.firstChild);
  }
  body.appendChild(wrapper);


  wrapper.style.opacity = 0;
  wrapper.style.transition = `opacity ${fadeDuration}ms ease`;
  requestAnimationFrame(() => {
    wrapper.style.opacity = 1;
  });


  document.querySelectorAll('a[href]').forEach(link => {

    if (link.host === location.host) {
      link.addEventListener('click', e => {
        e.preventDefault();
        const href = link.href;
        wrapper.style.opacity = 0;
        setTimeout(() => {
          location.href = href;
        }, fadeDuration);
      });
    }
  });
});
