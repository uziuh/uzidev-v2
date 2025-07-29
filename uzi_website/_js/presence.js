// made by uzi

const discordUserId = "1270223423594954777"; 


function setStatusIcon(status) {
  const statusIcon = document.getElementById('status-icon');
  if (!statusIcon) return;

  switch (status) {
    case 'online':
      statusIcon.src = 'https://cdn.discordapp.com/assets/3c805c7d0d9c7cfa995fbd900bf0b0f6.svg';
      statusIcon.alt = 'Online';
      break;
    case 'idle':
      statusIcon.src = 'https://cdn.discordapp.com/assets/66f96a84b62a44f0bfcc7a4ac74ec35e.svg';
      statusIcon.alt = 'Idle';
      break;
    case 'dnd':
      statusIcon.src = 'https://cdn.discordapp.com/assets/fb0a60d0f0ae5daee988e5757d8b0cc4.svg';
      statusIcon.alt = 'Do Not Disturb';
      break;
    case 'offline':
    default:
      statusIcon.src = 'https://cdn.discordapp.com/assets/80f4ef153d0a8e9b77a2e812f93398a3.svg';
      statusIcon.alt = 'Offline';
      break;
  }
}


function updateStatusPill(status) {
  const statusPill = document.getElementById('status-pill');
  if (!statusPill) return;

  const styles = {
    online: ['rgba(0, 128, 0, 0.2)', '#008000', 'rgba(0, 128, 0, 0.4)'],
    idle: ['rgba(255, 165, 0, 0.2)', '#FFA500', 'rgba(255, 165, 0, 0.4)'],
    dnd: ['rgba(255, 0, 0, 0.2)', '#FF0000', 'rgba(255, 0, 0, 0.4)'],
    offline: ['rgba(128, 128, 128, 0.2)', '#808080', 'rgba(128, 128, 128, 0.4)']
  };

  const [bg, color, border] = styles[status] || styles.offline;
  statusPill.textContent = status;
  statusPill.style.backgroundColor = bg;
  statusPill.style.color = color;
  statusPill.style.borderColor = border;
}


async function fetchDiscordPresence() {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${discordUserId}`);
    const json = await res.json();
    if (!json.success) throw new Error("Failed to fetch presence");

    const data = json.data;
    const { discord_user: user, discord_status: rawStatus, activities } = data;

    const status = rawStatus || 'offline';

    const usernameEl = document.getElementById('username');
    const pfpEl = document.getElementById('pfp');
    const activityEl = document.getElementById('activity');
    const activityNameEl = document.getElementById('activity-name');
    const activityDetailsEl = document.getElementById('activity-details');
    const activityImageEl = document.getElementById('activity-image');

    if (usernameEl) usernameEl.textContent = `${user.username}#${user.discriminator}`;
    if (pfpEl) pfpEl.src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;

    setStatusIcon(status);
    updateStatusPill(status);

    if (activities && activities.length > 0) {
      const activity = activities[0];
      if (activityEl) activityEl.style.display = 'flex';
      if (activityNameEl) activityNameEl.textContent = activity.name || "";
      if (activityDetailsEl) activityDetailsEl.textContent = activity.details || "";

      const assetKey = activity.assets?.large_image;
      const appId = activity.application_id;

      if (
        activityImageEl &&
        assetKey &&
        !assetKey.startsWith("mp:") &&
        !assetKey.startsWith("spotify:") &&
        !assetKey.startsWith("https://")
      ) {
        activityImageEl.src = `https://cdn.discordapp.com/app-assets/${appId}/${assetKey}.png`;
        activityImageEl.style.display = 'block';
      } else if (activityImageEl) {
        activityImageEl.style.display = 'none';
      }
    } else if (activityEl) {
      activityEl.style.display = 'none';
    }

  } catch (e) {
    console.error('Error fetching Discord presence:', e);

    const usernameEl = document.getElementById('username');
    const pfpEl = document.getElementById('pfp');
    const activityEl = document.getElementById('activity');

    if (usernameEl) usernameEl.textContent = 'Unable to fetch Discord info';
    if (pfpEl) pfpEl.src = 'https://i.imgur.com/ZQZSWrt.png';

    setStatusIcon('offline');
    updateStatusPill('offline');

    if (activityEl) activityEl.style.display = 'none';
  }
}

fetchDiscordPresence();
setInterval(fetchDiscordPresence, 30000);


const discordCard = document.getElementById('discord-card');
if (discordCard) {
  const maxRotation = 10; 
  const perspective = 800;

  let animationFrame;
  let rect = discordCard.getBoundingClientRect();


  window.addEventListener('resize', () => {
    rect = discordCard.getBoundingClientRect();
  });

  const handleTilt = (event) => {

    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const centerX = rect.width / 3;
    const centerY = rect.height / 3;


    const rotateX = ((offsetY - centerY) / centerY) * maxRotation;
    const rotateY = ((offsetX - centerX) / centerX) * maxRotation;


    if (animationFrame) cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(() => {
      discordCard.style.transform = `
        perspective(${perspective}px)
        rotateX(${-rotateX.toFixed(2)}deg)
        rotateY(${rotateY.toFixed(2)}deg)
      `;
      discordCard.style.transition = 'transform 0.1s ease-out'; 
    });
  };

  const resetTilt = () => {
    if (animationFrame) cancelAnimationFrame(animationFrame);


    discordCard.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
    discordCard.style.transform = `
      perspective(${perspective}px)
      rotateX(0deg)
      rotateY(0deg)
    `;
    animationFrame = requestAnimationFrame(() => {

      setTimeout(() => {
        discordCard.style.transition = '';
      }, 400);
    });
  };

  discordCard.addEventListener('mousemove', handleTilt);
  discordCard.addEventListener('mouseleave', resetTilt);


  discordCard.addEventListener('mouseenter', () => {
    rect = discordCard.getBoundingClientRect();
  });
}

