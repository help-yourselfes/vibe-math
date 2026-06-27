const line = '**Important derivatives to remember:**';
// CORRECT regex - $ is end anchor, not escaped
const r = /^\*\*(Important|Basic|Key)\s+.+(to remember|to know|rules)\*\*:\$/;
console.log('correct regex test:', r.test(line));
// Also try without anchor:
const r2 = /^\*\*(Important|Basic|Key)\s+.+(to remember|to know|rules)\*\*:/;
console.log('without end anchor:', r2.test(line));
