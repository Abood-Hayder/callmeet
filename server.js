const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;

// للإرسال من التطبيق
app.get('/token', (req, res) => {
  const appId = process.env.APP_ID;
  const appCertificate = process.env.APP_CERTIFICATE;

  const channelName = req.query.channelName;
  if (!channelName) {
    return res.status(400).json({ error: 'channelName is required' });
  }

  const uid = req.query.uid ? parseInt(req.query.uid) : 0;
  const role = RtcRole.PUBLISHER;

  const expireTime = 3600; // ساعة
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;

  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpireTime
  );

  return res.json({ token });
});

// لازم البورت يكون مفتوح
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
