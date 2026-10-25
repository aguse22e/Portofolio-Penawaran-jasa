var templates=[
"Halo [Nama / Nama Bisnis], perkenalkan saya Agus Kurniawan, Front-End Developer dari Jabodetabek.\n\nSaya lihat [Nama Bisnis] belum punya website / websitenya bisa ditingkatkan — saya bisa bantu buatkan website yang rapi, cepat, dan enak dibuka di HP, supaya calon pelanggan lebih percaya dan mudah menghubungi via WhatsApp.\n\nHasil kerja saya bisa langsung dilihat:\n• Company profile: agusdevcompanyprofile.vercel.app\n• Portofolio saya: agusedev1.vercel.app\n• Aplikasi kasir & akuntansi: github.com/aguse22e\n\nPaket mulai dari Rp 1,5 juta (landing page / company profile), pengerjaan 3–5 hari, DP 50%.\n\nBoleh saya kirimkan contoh tampilan & rincian paketnya untuk [Nama Bisnis]? Terima kasih.",
"Halo [Nama], saya Agus — menyambung penawaran website kemarin ya.\n\nSingkat saja: kalau mau mulai dari yang paling hemat juga bisa, kita kerjakan dulu yang paling penting (profil + layanan + tombol WhatsApp), fitur lainnya menyusul belakangan.\n\nMau saya bantu hitungkan versi hematnya untuk [Nama Bisnis]? Balas pesan ini saja, tidak wajib lanjut kalau belum cocok. Terima kasih.",
"Halo pemilik [Nama Toko / Usaha], perkenalkan saya Agus Kurniawan, pembuat website & aplikasi kasir (POS).\n\nSaya bisa bantu [Nama Toko] punya:\n• Website katalog biar pelanggan bisa lihat produk dari HP\n• (Opsional) Aplikasi POS / pencatatan keuangan sederhana\n\nContoh yang sudah saya buat bisa dilihat di agusedev1.vercel.app dan github.com/aguse22e (POS & Accounting).\nHarga website mulai Rp 1,5 juta, bisa dimulai dengan DP 50% dulu.\n\nBoleh saya tunjukkan contohnya sebentar? Terima kasih."
];
var tplEl=document.getElementById('tplText'), waBtn=document.getElementById('waBtn'), cur=0;
function showTpl(i){cur=i;tplEl.textContent=templates[i];waBtn.href='https://wa.me/?text='+encodeURIComponent(templates[i]);document.querySelectorAll('.tab').forEach(function(t,idx){t.classList.toggle('active',idx===i)});document.getElementById('copyOk').textContent='';}
document.querySelectorAll('.tab').forEach(function(t){t.addEventListener('click',function(){showTpl(parseInt(t.getAttribute('data-tpl'),10))})});
showTpl(0);
document.getElementById('copyBtn').addEventListener('click',function(){
  var txt=templates[cur], okEl=document.getElementById('copyOk');
  function ok(){okEl.textContent='✓ Tersalin — tinggal tempel & sesuaikan bagian [kurung siku]-nya.';}
  function manual(){
    var range=document.createRange();range.selectNodeContents(tplEl);
    var sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);
    okEl.textContent='Teks di atas sudah terseleksi — tekan Ctrl+C (atau tahan lalu pilih Salin) untuk menyalinnya.';
  }
  function fallback(){
    var ta=document.createElement('textarea');ta.value=txt;ta.setAttribute('readonly','');
    ta.style.cssText='position:fixed;top:0;left:0;width:2em;height:2em;opacity:0;';
    document.body.appendChild(ta);ta.focus();ta.select();
    var done=false;try{done=document.execCommand('copy');}catch(e){done=false;}
    document.body.removeChild(ta);
    if(done){ok();}else{manual();}
  }
  if(navigator.clipboard&&window.isSecureContext&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(ok).catch(fallback);}else{fallback();}
});
// Filter
document.querySelectorAll('.filter-btn').forEach(function(b){b.addEventListener('click',function(){
  document.querySelectorAll('.filter-btn').forEach(function(x){x.classList.remove('active')});b.classList.add('active');
  var f=b.getAttribute('data-filter');
  document.querySelectorAll('#projGrid .proj').forEach(function(c){c.style.display=(f==='all'||c.getAttribute('data-cat')===f)?'':'none';});
});});
// Calc
function fmt(n){return 'Rp '+n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.');}
function calc(){var sel=document.getElementById('baseSel');var base=parseInt(sel.value,10);var add=0;var picked=[];document.querySelectorAll('.addon.active').forEach(function(a){add+=parseInt(a.getAttribute('data-price'),10);picked.push('- '+a.textContent.trim());});var total=base+add;document.getElementById('totalVal').textContent=fmt(total);var projName=sel.options[sel.selectedIndex].textContent.split(' — ')[0];var msg='Halo Agus, saya baru saja memakai kalkulator estimasi di website Anda dan ingin minta harga final.\n\nJenis proyek: '+projName+' ('+fmt(base)+')\nFitur tambahan:\n'+(picked.length?picked.join('\n'):'- Tidak ada')+'\nEstimasi dari kalkulator: '+fmt(total)+'\n\nBoleh minta harga final untuk kebutuhan saya? Terima kasih.';document.getElementById('finalBtn').href='https://wa.me/6289522598705?text='+encodeURIComponent(msg);}
document.getElementById('baseSel').addEventListener('change',calc);
document.querySelectorAll('.addon').forEach(function(a){a.addEventListener('click',function(){a.classList.toggle('active');a.setAttribute('aria-pressed',a.classList.contains('active')?'true':'false');calc();});});
calc();
