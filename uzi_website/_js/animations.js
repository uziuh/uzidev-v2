// made by uzi
window.addEventListener('load', () => {

  const greetingText = document.querySelector('.greeting .text');
  if (greetingText) {
    greetingText.style.opacity = 0;
    greetingText.style.transition = 'opacity 1.2s ease-in-out';

    setTimeout(() => {
      greetingText.style.opacity = 1;
    }, 100);
  }


  const introHeading = document.querySelector('.intro-card h1');
  if (introHeading) {
    introHeading.style.transform = 'translateY(30px)';
    introHeading.style.opacity = 0;
    introHeading.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
    setTimeout(() => {
      introHeading.style.transform = 'translateY(0)';
      introHeading.style.opacity = 1;
    }, 300);
  }


  const discordCard = document.getElementById('discord-card');
  if (discordCard) {
    discordCard.style.transform = 'scale(0.9)';
    discordCard.style.opacity = 0;
    discordCard.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
    setTimeout(() => {
      discordCard.style.transform = 'scale(1)';
      discordCard.style.opacity = 1;
    }, 600);
  }
});
