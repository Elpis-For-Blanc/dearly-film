const $=id=>document.getElementById(id), poster=$('poster');
const genres=[['romance','♡ ROMANCE'],['youth','✿ YOUTH'],['romcom','♡ ROM-COM'],['thriller','☾ THRILLER'],['horror','◼ HORROR'],['sf','✦ SF'],['fantasy','☁ FANTASY'],['period','♛ PERIOD'],['indie','🎞 INDIE']];
const colorList=[['pink','#bd7893'],['cream','#c5ad91'],['sky','#7296ad'],['lavender','#887da6'],['wine','#6c273d'],['navy','#17283c'],['mono','#555'],['black','#111']];let genre='romance',color='pink';
function makeChips(){genres.forEach(([v,n],i)=>{let b=document.createElement('button');b.textContent=n;b.className=i?'':'on';b.onclick=()=>{genre=v;document.querySelectorAll('#genres button').forEach(x=>x.classList.remove('on'));b.classList.add('on');render()};$('genres').append(b)});colorList.forEach(([v,c],i)=>{let b=document.createElement('button');b.style.background=c;b.title=v;b.className=i?'':'on';b.onclick=()=>{color=v;document.querySelectorAll('#colors button').forEach(x=>x.classList.remove('on'));b.classList.add('on');render()};$('colors').append(b)})}makeChips();
const ids=['title','subtitle','tagline','star1','star2','date','runtime','synopsis','director','writer','music','layout','format','align','festival','titleColor','titleStyle','titleSize','titleFont','bodyFont','decoration','decorColor','decorOpacity','vignette','grain','titleShadow','accentLine','lightLeak','dust','edgeFade','topRule'];ids.forEach(id=>$(id).addEventListener('input',render));
const TITLE_FONTS={editorial:'Georgia, "Times New Roman", serif',modern:'Arial, "Noto Sans KR", sans-serif',cinema:'Impact, "Arial Black", sans-serif',classic:'"Times New Roman", Georgia, serif',typewriter:'"Courier New", monospace',soft:'Georgia, "Times New Roman", serif',gothic:'Georgia, "Times New Roman", serif'};
const BODY_FONTS={clean:'Arial, "Noto Sans KR", sans-serif',serif:'Georgia, "Times New Roman", serif',typewriter:'"Courier New", monospace',classic:'"Times New Roman", Georgia, serif'};
function applyTypography(){
 const h=$('pTitle'),copy=poster.querySelector('.copy'),tf=$('titleFont').value,bf=$('bodyFont').value;
 h.style.setProperty('font-family',TITLE_FONTS[tf]||TITLE_FONTS.editorial,'important');
 copy.style.fontFamily=BODY_FONTS[bf]||BODY_FONTS.clean;
 poster.querySelectorAll('.tagline,.syn,.sub,.stars,.meta,.credits').forEach(el=>el.style.fontFamily=BODY_FONTS[bf]||BODY_FONTS.clean);
 if(tf==='soft')h.style.fontStyle='italic'; else h.style.fontStyle='normal';
}
function applyDecoration(){
 const d=$('posterDecor'),type=$('decoration').value,c=$('decorColor').value,o=+$('decorOpacity').value/100;
 d.className='poster-decor decor-live decor-'+type; d.innerHTML=''; d.style.color=c; d.style.opacity=o; d.style.border='0'; d.style.background='none'; d.style.boxShadow='none';
 if(type==='none')return;
 const add=(cls,html='')=>{const x=document.createElement('div');x.className=cls;x.innerHTML=html;d.appendChild(x);return x};
 if(type==='editorial'){add('dl-frame');add('dl-frame dl-inner')}
 if(type==='cinema'){add('dl-cinema-top');add('dl-cinema-bottom');add('dl-cinema-left');add('dl-cinema-right')}
 if(type==='viewfinder'){['tl','tr','bl','br'].forEach(x=>add('dl-corner '+x));add('dl-smalltext','REC&nbsp;&nbsp; • &nbsp;&nbsp; 24 FPS')}
 if(type==='laurel'){add('dl-laurel','‹ &nbsp; OFFICIAL SELECTION &nbsp; ›');add('dl-laurel-star','✦')}
 if(type==='constellation'){add('dl-stars','✦　·　✧　　　·　✦');add('dl-stars dl-stars-2','·　✧　　·　✦')}
 if(type==='film'){add('dl-film dl-film-l');add('dl-film dl-film-r')}
 if(type==='letterbox'){add('dl-letterbox dl-letterbox-t');add('dl-letterbox dl-letterbox-b')}
 if(type==='archive'){add('dl-archive dl-archive-t','ARCHIVE / 01　 DEARLY FILM');add('dl-archive dl-archive-b','FRAME 024 · MASTER')}
 if(type==='romance'){add('dl-heart','♡');add('dl-dearly','— dearly, always —')}
}
function render(){poster.className=`poster genre-${genre} color-${color} layout-${$('layout').value} align-${$('align').value} title-${$('titleStyle').value} deco-${$('decoration').value} ${$('vignette').checked?'fx-vignette':''} ${$('grain').checked?'fx-grain':''} ${$('lightLeak').checked?'fx-lightleak':''} ${$('dust').checked?'fx-dust':''} ${$('edgeFade').checked?'fx-edgefade':''} ${$('titleShadow').checked?'title-shadow':''} ${$('format').value==='social'?'social':$('format').value==='a4'?'a4':''}`;poster.style.setProperty('--title-color',$('titleColor').value);poster.style.setProperty('--title-size',$('titleSize').value+'px');poster.style.setProperty('--decor-color',$('decorColor').value);poster.style.setProperty('--decor-opacity',+$('decorOpacity').value/100);poster.dataset.titleFont=$('titleFont').value;poster.dataset.bodyFont=$('bodyFont').value;$('titleSizeValue').textContent=$('titleSize').value;$('decorOpacityValue').textContent=$('decorOpacity').value;$('accentLinePreview').style.display=$('accentLine').checked?'block':'none';$('topRulePreview').style.display=$('topRule').checked?'flex':'none';$('pTitle').textContent=$('title').value;$('pSub').textContent=$('subtitle').value;$('pTag').textContent=$('tagline').value;$('pStars').textContent=[$('star1').value,$('star2').value].filter(Boolean).join(' · ');$('pSyn').textContent=$('synopsis').value;let meta=[];if($('date').value)meta.push($('date').value.replaceAll('-','.'));if($('runtime').value.trim())meta.push($('runtime').value.trim());$('pMeta').textContent=meta.join(' · ');let credits=[];if($('director').value.trim())credits.push(`DIRECTED BY <b>${esc($('director').value)}</b>`);if($('writer').value.trim())credits.push(`WRITTEN BY <b>${esc($('writer').value)}</b>`);if($('music').value.trim())credits.push(`MUSIC BY <b>${esc($('music').value)}</b>`);$('pCredits').innerHTML=credits.join(' · ');$('fest').style.display=$('festival').checked?'block':'none';applyTypography();applyDecoration();fit()}function esc(s){let d=document.createElement('div');d.textContent=s;return d.innerHTML}
function fit(){if(innerWidth>620){poster.style.transform='';poster.parentElement.style.height='';return}poster.style.transform='';let w=poster.getBoundingClientRect().width,avail=$('stage').clientWidth,scale=Math.min(1,avail/w);poster.style.transform=`scale(${scale})`;poster.parentElement.style.height=(poster.offsetHeight*scale)+'px'}addEventListener('resize',fit);
let cropTarget=null,cropImage=new Image(),cx=0,cy=0,baseScale=1,zoom=1,drag=false,lx=0,ly=0;const cc=$('cropCanvas'),ctx=cc.getContext('2d');function drawCrop(){ctx.clearRect(0,0,700,700);let s=baseScale*zoom,w=cropImage.naturalWidth*s,h=cropImage.naturalHeight*s;ctx.drawImage(cropImage,cx+(700-w)/2,cy+(700-h)/2,w,h)}function openCrop(file,target,nameEl){let r=new FileReader();r.onload=e=>{cropImage=new Image();cropImage.onload=()=>{cropTarget={target,nameEl,file};baseScale=Math.max(700/cropImage.naturalWidth,700/cropImage.naturalHeight);zoom=1;cx=cy=0;$('zoom').value=1;$('cropModal').classList.add('open');drawCrop()};cropImage.src=e.target.result};r.readAsDataURL(file)}
function photo(id,img,name){$(id).onchange=()=>{let f=$(id).files[0];if(f)openCrop(f,$(img),$(name));$(id).value=''}}photo('photo1','img1','name1');photo('photo2','img2','name2');$('zoom').oninput=()=>{zoom=+$('zoom').value;drawCrop()};cc.onpointerdown=e=>{drag=true;lx=e.clientX;ly=e.clientY;cc.setPointerCapture(e.pointerId)};cc.onpointermove=e=>{if(!drag)return;let rect=cc.getBoundingClientRect(),ratio=700/rect.width;cx+=(e.clientX-lx)*ratio;cy+=(e.clientY-ly)*ratio;lx=e.clientX;ly=e.clientY;drawCrop()};cc.onpointerup=()=>drag=false;$('cropReset').onclick=()=>{cx=cy=0;zoom=1;$('zoom').value=1;drawCrop()};$('cropClose').onclick=()=>{$('cropModal').classList.remove('open');cropTarget=null};$('cropApply').onclick=()=>{if(!cropTarget)return;cropTarget.target.src=cc.toDataURL('image/jpeg',.94);cropTarget.target.style.display='block';cropTarget.nameEl.textContent=cropTarget.file.name;$('cropModal').classList.remove('open');cropTarget=null;render()};
$('reset').onclick=()=>{document.querySelectorAll('.group input:not([type="file"]), .group textarea').forEach(el=>{if(el.type==='checkbox')el.checked=false;else el.value=''});genre='romance';color='pink';document.querySelectorAll('#genres button').forEach((b,i)=>b.classList.toggle('on',i===0));document.querySelectorAll('#colors button').forEach((b,i)=>b.classList.toggle('on',i===0));$('layout').value='full';$('format').value='poster';$('align').value='center';$('titleColor').value='#ffffff';$('titleStyle').value='classic';$('titleSize').value='55';$('titleFont').value='editorial';$('bodyFont').value='clean';$('decoration').value='none';$('decorColor').value='#ffffff';$('decorOpacity').value='72';$('vignette').checked=true;$('grain').checked=false;$('lightLeak').checked=false;$('dust').checked=false;$('edgeFade').checked=false;$('titleShadow').checked=true;$('accentLine').checked=false;$('topRule').checked=false;['img1','img2'].forEach(id=>{let im=$(id);im.removeAttribute('src');im.style.display='none'});$('name1').textContent='선택된 파일 없음';$('name2').textContent='선택된 파일 없음';render()};
$('save').onclick=async()=>{if(!window.html2canvas){alert('저장 모듈을 불러오지 못했어요.');return}let btn=$('save'),old=btn.textContent;btn.textContent='포스터 만드는 중…';btn.disabled=true;try{if(document.fonts)await document.fonts.ready;for(const im of poster.querySelectorAll('img'))if(im.src)try{await im.decode()}catch{}let root=document.createElement('div');root.className='dearly-export';let clone=poster.cloneNode(true);clone.style.transform='none';root.append(clone);document.body.append(root);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));let canvas=await html2canvas(clone,{scale:3,useCORS:true,backgroundColor:null,logging:false,width:clone.offsetWidth,height:clone.offsetHeight,windowWidth:1400,windowHeight:1800});root.remove();canvas.toBlob(blob=>{let a=document.createElement('a'),url=URL.createObjectURL(blob),name=($('title').value||'Movie').replace(/[\\/:*?"<>|]/g,' ');a.href=url;a.download=`DEARLY FILM — ${name}.png`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)},'image/png')}catch(e){console.error(e);alert('PNG 저장 중 문제가 생겼어요.')}finally{btn.textContent=old;btn.disabled=false}};render();

// v1.3 · AI chat OOC helper
const genreOocGuide={
  romance:'로맨스. 두 인물의 감정선과 관계의 핵심을 중심으로, 서정적이고 설레는 영화 톤.',
  youth:'청춘. 성장, 계절, 미완성의 감정과 반짝이는 순간을 중심으로 한 청춘영화 톤.',
  romcom:'로맨틱 코미디. 두 인물의 케미와 사건을 살린 밝고 재치 있는 영화 톤.',
  thriller:'스릴러. 긴장, 비밀, 갈등과 위험을 강조한 날카롭고 몰입감 있는 영화 톤.',
  horror:'호러. 관계나 세계관 속 불안과 공포를 활용한 음산하고 인상적인 영화 톤.',
  sf:'SF. 인물 관계와 기존 세계관을 미래적·과학적 이미지와 결합한 영화 톤.',
  fantasy:'판타지. 운명, 세계관, 상징과 환상성을 살린 웅장하거나 몽환적인 영화 톤.',
  period:'시대극. 시대적 분위기와 인물의 관계·운명을 살린 고전적이고 우아한 영화 톤.',
  indie:'인디. 사소한 감정과 일상의 결을 포착하는 절제되고 문학적인 독립영화 톤.'
};
function makeFilmOOC(){
  const label=(genres.find(x=>x[0]===genre)||['',genre])[1].replace(/^[^A-Z가-힣]+\s*/, '');
  const starNames=[$('star1').value.trim(),$('star2').value.trim()].filter(Boolean);
  const cast=starNames.length?` 등장인물/주연 표기는 ${starNames.join(' / ')}를 참고하되, 채팅 속 설정과 충돌하면 기존 설정을 우선할 것.`:'';
  return `[OOC: 지금까지의 대화, 설정, 사건, {{char}}와 {{user}}의 관계를 바탕으로 두 사람의 이야기를 한 편의 ${label} 영화라고 가정한다. 장르는 '${genreOocGuide[genre]}' 방향으로 해석할 것.${cast} 대화에서 확인된 관계성·세계관·성격·주요 사건을 최우선으로 반영하고, 확인되지 않은 중요한 설정을 임의로 확정하지 말 것. 포스터에 바로 옮겨 적을 수 있도록 아래 4개 항목만 한국어로 작성한다. 제목은 짧고 기억에 남게, 서브타이틀은 제목과 다른 뉘앙스를 더하는 짧은 문구로, 캐치프레이즈는 영화 포스터에 어울리는 한 문장으로, 시놉시스는 핵심 관계와 갈등/분위기가 드러나는 3~5문장으로 작성한다. 캐릭터의 말투로 답하지 말고 영화 홍보 문안처럼 작성할 것.\n\n제목: \n서브타이틀: \n캐치프레이즈: \n시놉시스:]`;
}
async function copyFilmOOC(){
  const text=makeFilmOOC(), btn=$('oocCopy'), status=$('oocStatus');
  try{
    await navigator.clipboard.writeText(text);
  }catch(e){
    const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();
  }
  btn.textContent='OOC 복사 완료 ✓';btn.classList.add('copied');
  status.textContent=`${(genres.find(x=>x[0]===genre)||['',''])[1]} 장르용 OOC가 복사됐어요. AI 채팅방에 그대로 붙여넣어 주세요.`;
  setTimeout(()=>{btn.textContent='선택 장르 OOC 복사 ♡';btn.classList.remove('copied')},1800);
}
$('oocCopy').addEventListener('click',copyFilmOOC);
