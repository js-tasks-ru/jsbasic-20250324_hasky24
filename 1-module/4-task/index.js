function checkSpam(str) {

  if (typeof str != 'string') return;

  let copystr = str.toLowerCase();

  return copystr.includes('1xBet'.toLowerCase()) || copystr.includes('XXX'.toLowerCase());
}
