const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();
const PORT = 3000;

// بياناتك من Agora
const APP_ID = '8167f43b448646bab9be53e2944cedc0';
const APP_CERTIFICATE = '4b7ab20fa6b3401889213e919cbe6d4f';

app.get('/rtc-token', (req, res) => {
  const channelName = req.query.channelName;
  if (!channelName) {
    return res.status(400).json({ error: 'يجب تحديد اسم القناة' });
  }

  const uid = req.query.uid || 0; // 0 يعني UID عشوائي
  const role = RtcRole.PUBLISHER;
  const expireTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTimestamp + expireTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpireTime
  );

  return res.json({ token });
});

app.listen(PORT, () => {
  console.log(`✅ سيرفر التوكن شغال على http://localhost:${PORT}`);
});
