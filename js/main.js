const observer = new IntersectionObserver(entries => {
  entries.forEach(el => { if(el.isIntersecting) el.target.classList.add('visible'); });
},{threshold:0.06});
document.querySelectorAll('.fade-in,.product-card').forEach(el => observer.observe(el));

function filtrar(btn, tipo){
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.product-card').forEach(card => {
    const soldout = card.dataset.soldout === 'true';
    const mat = card.dataset.material || '';
    let show = true;
    if(tipo === 'disponibles') show = !soldout;
    else if(tipo === 'raku') show = mat.includes('raku');
    else if(tipo === 'ceramica') show = mat.includes('cer') && !mat.includes('raku');
    card.style.display = show ? '' : 'none';
  });
}

function openModal(num){
  const d = LAMPS[num];
  if(!d) return;
  document.getElementById('modal-num').textContent = num;
  document.getElementById('modal-name').textContent = 'Lámpara ' + d.name;
  const modalImg = document.getElementById('modal-img');
  if(d.img){ modalImg.src = d.img; modalImg.style.display=''; } else { modalImg.style.display='none'; }
  document.getElementById('modal-img').alt = 'Lámpara ' + d.name;
  document.getElementById('modal-price').textContent = d.precio;
  document.getElementById('modal-detail').innerHTML =
    '<div class="modal-detail-row"><span>Material</span><span>' + d.mat + '</span></div>' +
    '<div class="modal-detail-row"><span>Medidas base</span><span>' + d.medidas + '</span></div>' +
    '<div class="modal-detail-row"><span>Disponibilidad</span><span>' + (d.soldout ? 'Sin stock' : 'Disponible') + '</span></div>';
  const waMsg = encodeURIComponent('Hola! Vi la Lámpara ' + d.name + ' en la web y quiero consultar. ¿Está disponible?');
  const waLink = document.getElementById('modal-wa');
  waLink.href = 'https://wa.me/5491150042077?text=' + waMsg;
  waLink.classList.toggle('disabled', d.soldout);
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(e){
  if(e.target === document.getElementById('modal')) closeModal();
}

document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

function enviarForm(){
  const nombre = document.querySelector('.form-input[type=text]').value;
  const email = document.querySelector('.form-input[type=email]').value;
  const interes = document.querySelector('.form-select').value;
  const msg = document.querySelector('.form-textarea').value;
  if(!nombre || !email || !msg){ alert('Por favor completá nombre, email y mensaje.'); return; }
  const text = encodeURIComponent('Consulta web\nDe: ' + nombre + ' (' + email + ')\nInterés: ' + interes + '\n\n' + msg);
  window.open('https://wa.me/5491150042077?text=' + text,'_blank');
}
</script>
