const { Op, DetachedTimestampFile } = require('javascript-opentimestamps');
const crypto = require('crypto');
const fs = require('fs');

const createTimestamp = async (content) => {
  const hash = crypto.createHash('sha256').update(content).digest();
  const ts = new DetachedTimestampFile(hash);
  await Op.getDefaultCalendar().stamp(ts);
  const ots = await ts.serializeToBytes();
  const dir = 'timestamps';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const path = `${dir}/${hash.toString('hex')}.ots`;
  fs.writeFileSync(path, Buffer.from(ots));
  return { hash: hash.toString('hex'), path };
};

module.exports = { createTimestamp };
