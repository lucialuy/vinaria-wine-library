import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Search, SlidersHorizontal, Grid3X3, LibraryBig, BookOpen, Bookmark,
  Star, X, Check, ChevronRight, Grape, MapPin, CalendarDays, Wine,
  Sparkles, RotateCcw, Menu, Heart, ArrowUpRight, CircleUserRound,
  Clock3, Utensils, Droplets, PanelLeftClose, ScrollText, FlaskConical
} from 'lucide-react';
import './styles.css';
import bordeauxImage from './assets/region-bordeaux.webp';
import burgundyImage from './assets/region-burgundy.webp';
import tuscanyImage from './assets/region-tuscany.webp';

const wines = [
  {
    id: 'margaux-2015', name: 'Château Margaux', cn: '玛歌酒庄', vintage: 2015,
    region: '波尔多', subregion: 'Margaux, France', country: '法国', grape: '赤霞珠混酿', type: 'Left Bank',
    tannin: 4.5, acidity: 4, body: 4.5, sweetness: 1, score: 99, price: '¥9,800+',
    color: '#7a1e32', accent: '#d8b46b', monogram: 'CM', collection: '一级庄',
    profile: ['黑醋栗', '雪松', '紫罗兰', '石墨'],
    story: '2015 是波尔多左岸的伟大年份。成熟度与清新感兼具，玛歌产区标志性的花香和丝绸般质地被完整放大。',
    window: '2028—2065', pairing: '炭烤牛排、黑松露、熟成孔泰奶酪', vintageNote: '温暖干燥，采收条件近乎理想；果实成熟而保有酸度。'
  },
  {
    id: 'sassicaia-2016', name: 'Sassicaia', cn: '西施佳雅', vintage: 2016,
    region: '托斯卡纳', subregion: 'Bolgheri, Italy', country: '意大利', grape: '赤霞珠 / 品丽珠', type: 'Super Tuscan',
    tannin: 4, acidity: 4.5, body: 4.5, sweetness: 1, score: 100, price: '¥3,600+',
    color: '#8b2e2b', accent: '#e2c17d', monogram: 'S', collection: '传奇年份',
    profile: ['黑樱桃', '地中海香草', '烟草', '矿物'],
    story: '2016 被许多评论家视作西施佳雅的标杆年份。果味纯净、结构精准，展示了保格利海风与砾石土壤的平衡。',
    window: '2024—2055', pairing: '迷迭香羊排、牛肝菌烩饭、帕玛森', vintageNote: '漫长均衡的生长季，让单宁极细、香气层次完整。'
  },
  {
    id: 'clos-vougeot-2019', name: 'Clos de Vougeot', cn: '伏旧园特级园', vintage: 2019,
    region: '勃艮第', subregion: 'Côte de Nuits, France', country: '法国', grape: '黑皮诺', type: 'Grand Cru',
    tannin: 3.5, acidity: 4.5, body: 3.5, sweetness: 1, score: 96, price: '¥2,900+',
    color: '#a53f45', accent: '#d9c5a4', monogram: 'CV', collection: '特级园',
    profile: ['红樱桃', '玫瑰', '森林地表', '香料'],
    story: '伏旧园由古老石墙围合，不同地块风格差异明显。2019 的阳光感让果味更丰沛，同时保留夜丘的线性酸度。',
    window: '2026—2045', pairing: '烤鸭、蘑菇酥皮、软质奶酪', vintageNote: '成熟集中却并不厚重，是兼具可亲性与陈年潜力的年份。'
  },
  {
    id: 'rioja-904-2011', name: 'Gran Reserva 904', cn: '904 特级珍藏', vintage: 2011,
    region: '里奥哈', subregion: 'Rioja Alta, Spain', country: '西班牙', grape: '丹魄 / 格拉西亚诺', type: 'Gran Reserva',
    tannin: 3.5, acidity: 4, body: 3.5, sweetness: 1, score: 96, price: '¥620+',
    color: '#9d4937', accent: '#e8d1a3', monogram: '904', collection: '经典派',
    profile: ['草莓干', '椰子', '烟叶', '皮革'],
    story: '长时间美国橡木桶陈年塑造出经典里奥哈气质：成熟红果、甜香料和皮革感层层展开。',
    window: '现在—2038', pairing: '伊比利亚火腿、慢炖羊膝、曼彻格奶酪', vintageNote: '偏暖年份带来成熟果味，酒庄以长陈年换取丝滑融合度。'
  },
  {
    id: 'barolo-monprivato-2013', name: 'Barolo Monprivato', cn: '梦馥迪巴罗洛', vintage: 2013,
    region: '皮埃蒙特', subregion: 'Castiglione Falletto, Italy', country: '意大利', grape: '内比奥罗', type: 'MGA',
    tannin: 5, acidity: 5, body: 4, sweetness: 1, score: 97, price: '¥1,850+',
    color: '#873329', accent: '#d4ae67', monogram: 'M', collection: '耐心之选',
    profile: ['酸樱桃', '干玫瑰', '焦油', '甘草'],
    story: 'Monprivato 以细腻与香气著称。2013 是传统派珍爱的慢熟年份，年轻时紧致，陈年后会展现玫瑰与松露。',
    window: '2027—2050', pairing: '白松露意面、红酒炖牛肉、榛子烤乳鸽', vintageNote: '凉爽漫长，酸度鲜明、单宁精确，是典型的长跑型年份。'
  },
  {
    id: 'opus-one-2018', name: 'Opus One', cn: '作品一号', vintage: 2018,
    region: '纳帕谷', subregion: 'Oakville, USA', country: '美国', grape: '波尔多混酿', type: 'Napa Icon',
    tannin: 4, acidity: 3.5, body: 4.5, sweetness: 1.5, score: 98, price: '¥3,900+',
    color: '#62203b', accent: '#d9b77b', monogram: 'O', collection: '新世界',
    profile: ['黑莓', '可可', '紫罗兰', '铅笔屑'],
    story: '2018 的纳帕拥有漫长温和的生长季。作品一号在浓郁黑果之外，呈现少见的克制、抛光感与清晰轮廓。',
    window: '2025—2048', pairing: '短肋牛排、烤根茎蔬菜、黑巧克力', vintageNote: '稳定温和，成熟缓慢均匀，酚类成熟度和清新度俱佳。'
  },
  {
    id: 'hermitage-2015', name: 'Hermitage La Chapelle', cn: '隐士教堂园', vintage: 2015,
    region: '罗讷河谷', subregion: 'Hermitage, France', country: '法国', grape: '西拉', type: 'Hermitage',
    tannin: 4.5, acidity: 4, body: 5, sweetness: 1, score: 100, price: '¥2,600+',
    color: '#4f2237', accent: '#d3ad73', monogram: 'HC', collection: '传奇年份',
    profile: ['黑橄榄', '蓝莓', '黑胡椒', '熏肉'],
    story: '北罗讷西拉的力量与岩石感在 2015 年被推向高峰。深邃却不笨重，黑色果实下藏着烟熏、胡椒和花香。',
    window: '2028—2060', pairing: '胡椒鹿肉、慢烤羊肩、烟熏茄子', vintageNote: '阳光充足、风土表达清晰，被誉为现代北罗讷的伟大年份之一。'
  },
  {
    id: 'penfolds-grange-2014', name: 'Penfolds Grange', cn: '奔富葛兰许', vintage: 2014,
    region: '南澳', subregion: 'South Australia', country: '澳大利亚', grape: '西拉 / 赤霞珠', type: 'Australian Icon',
    tannin: 4.5, acidity: 3.5, body: 5, sweetness: 1.5, score: 98, price: '¥4,500+',
    color: '#6b2025', accent: '#e1c284', monogram: 'PG', collection: '新世界',
    profile: ['黑李子', '摩卡', '甘草', '香草橡木'],
    story: '葛兰许以跨产区混酿追求稳定的宏大风格。2014 浓郁、紧实，澳洲西拉甜美果香与新橡木形成辨识度极高的组合。',
    window: '2026—2050', pairing: '炭烤战斧牛排、烧烤猪肋排、蓝纹奶酪', vintageNote: '部分产区条件严苛，但优质果实浓缩度出色，结构强健。'
  },
  {
    id: 'vieux-telegraphe-2016', name: 'Vieux Télégraphe', cn: '老电报酒庄', vintage: 2016,
    region: '罗讷河谷', subregion: 'Châteauneuf-du-Pape, France', country: '法国', grape: '歌海娜混酿', type: 'Southern Rhône',
    tannin: 4, acidity: 3.5, body: 4.5, sweetness: 1.5, score: 96, price: '¥780+',
    color: '#8f3b2e', accent: '#d8b980', monogram: 'VT', collection: '风土课',
    profile: ['黑樱桃', '普罗旺斯香草', '白胡椒', '卵石'],
    story: '来自遍布巨大鹅卵石的 La Crau 高地，老藤歌海娜带来成熟果味，西拉与慕合怀特提供骨架和咸鲜感。',
    window: '现在—2038', pairing: '普罗旺斯炖菜、香草烤羊腿、橄榄炖鸡', vintageNote: '南罗讷近乎教科书般的年份：成熟、纯净、结构平衡。'
  },
  {
    id: 'chile-don-melchor-2018', name: 'Don Melchor', cn: '魔爵赤霞珠', vintage: 2018,
    region: '迈坡谷', subregion: 'Puente Alto, Chile', country: '智利', grape: '赤霞珠', type: 'Andes Cabernet',
    tannin: 4, acidity: 4, body: 4.5, sweetness: 1, score: 97, price: '¥950+',
    color: '#643347', accent: '#cbb07b', monogram: 'DM', collection: '高性价比',
    profile: ['黑加仑', '薄荷', '石墨', '月桂叶'],
    story: '安第斯山脚的昼夜温差赋予赤霞珠成熟黑果和薄荷气息。2018 精准、清凉，展示智利名庄的陈年实力。',
    window: '2025—2042', pairing: '香煎牛排、香草炖羊肉、硬质奶酪', vintageNote: '凉爽均衡，采收从容，果味成熟而酸度保持良好。'
  },
  {
    id: 'german-pinot-2020', name: 'Spätburgunder GG', cn: '黑皮诺特级园', vintage: 2020,
    region: '阿尔', subregion: 'Ahr, Germany', country: '德国', grape: '黑皮诺', type: 'Grosses Gewächs',
    tannin: 2.5, acidity: 4.5, body: 3, sweetness: 1, score: 94, price: '¥680+',
    color: '#b05b58', accent: '#eee0bd', monogram: 'GG', collection: '冷门佳酿',
    profile: ['红醋栗', '蔓越莓', '湿岩石', '丁香'],
    story: '德国阿尔河谷的板岩陡坡让黑皮诺兼具红果、烟熏矿物感和明亮酸度，是探索冷凉产区风格的好入口。',
    window: '现在—2034', pairing: '烟熏鸭胸、烤甜菜、香煎三文鱼', vintageNote: '温暖年份带来比通常更成熟的果实，同时仍保留冷凉产区张力。'
  },
  {
    id: 'cahors-2016', name: 'Cahors Le Cèdre', cn: '雪松庄园卡奥尔', vintage: 2016,
    region: '法国西南', subregion: 'Cahors, France', country: '法国', grape: '马尔贝克', type: 'Cahors',
    tannin: 4.5, acidity: 4, body: 4.5, sweetness: 1, score: 94, price: '¥390+',
    color: '#47203c', accent: '#c89f6e', monogram: 'LC', collection: '高性价比',
    profile: ['黑李子', '紫罗兰', '甘草', '碎石'],
    story: '马尔贝克的故乡并非阿根廷，而是法国卡奥尔。这里的版本更紧致、咸鲜、带明显紫罗兰与矿物气息。',
    window: '现在—2036', pairing: '油封鸭、黑椒牛肉、烤茄子', vintageNote: '西南法的优秀年份，成熟度充足，单宁扎实但不粗糙。'
  }
];

const regionImages = {
  '波尔多': bordeauxImage,
  '勃艮第': burgundyImage,
  '托斯卡纳': tuscanyImage
};

const navItems = [
  { id: 'library', label: '酒馆藏书', icon: LibraryBig },
  { id: 'shelf', label: '我的酒架', icon: Bookmark },
  { id: 'journal', label: '品鉴手记', icon: BookOpen }
];

const sensory = [
  { key: 'tannin', label: '单宁', hint: '口腔的收敛与抓力' },
  { key: 'acidity', label: '酸度', hint: '清新、唾液分泌感' },
  { key: 'body', label: '酒体', hint: '入口的重量与浓度' },
  { key: 'sweetness', label: '甜度', hint: '残糖带来的甜感' }
];

function useStoredState(key, initial) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial; } catch { return initial; }
  });
  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]);
  return [value, setValue];
}

function App() {
  const [activeNav, setActiveNav] = useState('library');
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('全部产区');
  const [grape, setGrape] = useState('全部品种');
  const [view, setView] = useState('gallery');
  const [selected, setSelected] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profiles, setProfiles] = useStoredState('vinaria-profiles', {});

  const regions = ['全部产区', ...new Set(wines.map(w => w.region))];
  const grapes = ['全部品种', ...new Set(wines.map(w => w.grape))];

  const filtered = useMemo(() => {
    let list = wines.filter(w => {
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || [w.name, w.cn, w.region, w.subregion, w.grape, w.vintage, ...w.profile]
        .join(' ').toLowerCase().includes(q);
      return matchesQuery && (region === '全部产区' || w.region === region) && (grape === '全部品种' || w.grape === grape);
    });
    if (activeNav === 'shelf') list = list.filter(w => profiles[w.id]?.tried || profiles[w.id]?.saved);
    if (activeNav === 'journal') list = list.filter(w => profiles[w.id]?.note);
    return list;
  }, [query, region, grape, activeNav, profiles]);

  const triedCount = wines.filter(w => profiles[w.id]?.tried).length;
  const rated = wines.filter(w => profiles[w.id]?.rating).length;
  const avgRating = rated ? (wines.reduce((sum, w) => sum + (profiles[w.id]?.rating || 0), 0) / rated).toFixed(1) : '—';

  const openRandom = () => {
    const pool = filtered.length ? filtered : wines;
    setSelected(pool[Math.floor(Math.random() * pool.length)]);
  };

  const updateProfile = (id, patch) => {
    setProfiles(prev => ({ ...prev, [id]: { ...(prev[id] || {}), ...patch } }));
  };

  const resetFilters = () => { setQuery(''); setRegion('全部产区'); setGrape('全部品种'); };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? 'is-open' : ''}`}>
        <button className="sidebar-close" aria-label="关闭菜单" onClick={() => setMobileMenu(false)}><PanelLeftClose size={20}/></button>
        <a className="brand" href="#top" onClick={() => { setActiveNav('library'); setMobileMenu(false); }}>
          <span className="brand-mark"><Wine size={18}/></span>
          <span><b>VINARIA</b><small>THE WINE LIBRARY</small></span>
        </a>
        <p className="nav-kicker">馆藏</p>
        <nav>
          {navItems.map(item => {
            const Icon = item.icon;
            return <button key={item.id} className={activeNav === item.id ? 'active' : ''} onClick={() => { setActiveNav(item.id); setMobileMenu(false); }}>
              <Icon size={18}/><span>{item.label}</span>
              {item.id === 'shelf' && triedCount > 0 && <em>{triedCount}</em>}
            </button>;
          })}
        </nav>
        <div className="sidebar-divider"/>
        <p className="nav-kicker">探索路径</p>
        <div className="path-card">
          <span className="path-icon"><Grape size={18}/></span>
          <div><small>本月主题</small><b>读懂单宁</b></div>
          <ChevronRight size={16}/>
        </div>
        <div className="progress-card">
          <div className="progress-ring" style={{'--progress': `${Math.max(5, triedCount / wines.length * 100)}%`}}><span>{triedCount}</span></div>
          <div><b>你的品鉴护照</b><span>{triedCount ? `已探索 ${triedCount} / ${wines.length} 款` : '从第一杯开始收藏'}</span></div>
        </div>
        <div className="sidebar-profile"><CircleUserRound size={28}/><div><b>我的酒窖</b><small>Private collection</small></div><ChevronRight size={16}/></div>
      </aside>

      {mobileMenu && <button className="backdrop" aria-label="关闭菜单" onClick={() => setMobileMenu(false)}/>} 

      <main id="top">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileMenu(true)} aria-label="打开菜单"><Menu/></button>
          <div className="global-search"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="搜索酒庄、年份、产区或风味…"/><kbd>⌘ K</kbd></div>
          <div className="top-actions"><span className="today-note"><Sparkles size={15}/> 今日适合认识一款新酒</span><button className="avatar">V</button></div>
        </header>

        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow"><span/> A PRIVATE ARCHIVE OF TASTE</p>
            <h1>每一瓶酒，<br/>都是一段可被<span>收藏</span>的时间。</h1>
            <p className="hero-copy">从年份气候到单宁结构，像逛一座图书馆一样认识世界名酒。<br/>喝过的、喜欢的、想记住的，都有自己的位置。</p>
            <div className="hero-actions">
              <button className="primary" onClick={() => document.querySelector('#collection')?.scrollIntoView({behavior:'smooth'})}>进入馆藏 <ArrowUpRight size={17}/></button>
              <button className="ghost" onClick={openRandom}><RotateCcw size={16}/> 随机抽一瓶</button>
            </div>
          </div>
          <div className="hero-stats">
            <div><strong>{wines.length}</strong><span>策展酒款</span></div>
            <i/>
            <div><strong>{triedCount}</strong><span>已经喝过</span></div>
            <i/>
            <div><strong>{avgRating}</strong><span>平均评分</span></div>
          </div>
        </section>

        <section className="content" id="collection">
          <div className="section-heading">
            <div><p className="eyebrow dark"><span/> CURATED COLLECTION</p><h2>{activeNav === 'library' ? '今日馆藏' : activeNav === 'shelf' ? '我的酒架' : '品鉴手记'}</h2><p>{activeNav === 'library' ? '从经典年份开始，建立属于你的风味坐标。' : activeNav === 'shelf' ? '收藏想喝的，也记住真正喝过的。' : '带有你私人笔记的酒款。'}</p></div>
            <div className="view-switch"><button className={view === 'gallery' ? 'active' : ''} onClick={() => setView('gallery')} aria-label="画廊视图"><Grid3X3 size={17}/></button><button className={view === 'shelf' ? 'active' : ''} onClick={() => setView('shelf')} aria-label="酒架视图"><LibraryBig size={17}/></button></div>
          </div>

          <div className="filter-bar">
            <div className="filter-label"><SlidersHorizontal size={17}/><span>筛选馆藏</span></div>
            <select value={region} onChange={e => setRegion(e.target.value)}>{regions.map(r => <option key={r}>{r}</option>)}</select>
            <select value={grape} onChange={e => setGrape(e.target.value)}>{grapes.map(g => <option key={g}>{g}</option>)}</select>
            <div className="quick-search"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="输入风味：雪松、樱桃…"/></div>
            {(query || region !== '全部产区' || grape !== '全部品种') && <button className="reset" onClick={resetFilters}><X size={14}/> 清除</button>}
            <span className="result-count">{filtered.length} 款</span>
          </div>

          {activeNav === 'library' && !query && region === '全部产区' && grape === '全部品种' && (
            <div className="region-strip">
              {[
                {name:'波尔多', sub:'结构与陈年的艺术', count: wines.filter(w=>w.region==='波尔多').length},
                {name:'勃艮第', sub:'一块土地，一种细微', count: wines.filter(w=>w.region==='勃艮第').length},
                {name:'托斯卡纳', sub:'阳光、香草与革新', count: wines.filter(w=>w.region==='托斯卡纳').length}
              ].map(r => <button className="region-card" key={r.name} onClick={() => setRegion(r.name)} style={{backgroundImage:`linear-gradient(180deg, rgba(12,8,7,.05), rgba(12,8,7,.86)), url(${regionImages[r.name]})`}}>
                <small>{r.count.toString().padStart(2,'0')} PICKS</small><div><b>{r.name}</b><span>{r.sub}</span></div><ArrowUpRight size={18}/>
              </button>)}
            </div>
          )}

          {filtered.length ? (
            <div className={`wine-grid ${view === 'shelf' ? 'shelf-view' : ''}`}>
              {filtered.map((wine, index) => <WineCard key={wine.id} wine={wine} index={index} profile={profiles[wine.id]} onOpen={() => setSelected(wine)} onSave={() => updateProfile(wine.id, {saved: !profiles[wine.id]?.saved})}/>) }
            </div>
          ) : (
            <div className="empty-state"><Wine size={34}/><h3>这一层酒架还是空的</h3><p>{activeNav === 'shelf' ? '先去馆藏里标记“喝过”或收藏喜欢的酒。' : activeNav === 'journal' ? '为一款酒写下品鉴笔记后，它会出现在这里。' : '试试放宽产区、品种或搜索条件。'}</p><button onClick={() => {setActiveNav('library');resetFilters();}}>返回全部馆藏</button></div>
          )}
        </section>

        <section className="lesson-section">
          <div className="lesson-copy"><p className="eyebrow"><span/> 5 MINUTE WINE LESSON</p><h2>单宁，不是“涩”<br/>这么简单。</h2><p>它来自葡萄皮、籽与橡木桶。好的单宁会像细密的丝绒，给酒搭起可以陈年的骨架。</p><button onClick={() => setSelected(wines.find(w => w.id === 'barolo-monprivato-2013'))}>用一瓶 Barolo 来理解 <ArrowUpRight size={17}/></button></div>
          <div className="tannin-visual">
            <div className="glass-orbit"><div className="wine-glass"><div className="wine-fill"/></div><span className="orbit o1">来源<br/><b>葡萄皮</b></span><span className="orbit o2">感受<br/><b>口腔收敛</b></span><span className="orbit o3">作用<br/><b>陈年骨架</b></span></div>
          </div>
        </section>

        <footer><a className="brand footer-brand" href="#top"><span className="brand-mark"><Wine size={17}/></span><span><b>VINARIA</b><small>THE WINE LIBRARY</small></span></a><p>少喝一点，喝懂一点。请理性饮酒。</p><span>CURATED IN 2026</span></footer>
      </main>

      {selected && <WineDetail wine={selected} profile={profiles[selected.id] || {}} onClose={() => setSelected(null)} onUpdate={patch => updateProfile(selected.id, patch)}/>} 
    </div>
  );
}

function WineCard({ wine, profile = {}, onOpen, onSave, index }) {
  return <article className="wine-card" style={{'--delay': `${Math.min(index, 8) * 45}ms`}}>
    <button className={`save-button ${profile.saved ? 'saved' : ''}`} onClick={e => {e.stopPropagation();onSave();}} aria-label="收藏"><Heart size={16} fill={profile.saved ? 'currentColor' : 'none'}/></button>
    <button className="card-main" onClick={onOpen}>
      <div className="wine-art" style={{'--wine': wine.color, '--accent': wine.accent}}>
        <span className="vintage-stamp">{wine.vintage}</span>
        <div className="bottle-shadow"/><div className="bottle"><div className="bottle-neck"><span/></div><div className="bottle-label"><small>{wine.country.toUpperCase()}</small><strong>{wine.monogram}</strong><i/><em>{wine.collection}</em><span>ESTATE SELECTION</span></div></div>
        {profile.tried && <span className="tried-badge"><Check size={12}/> 喝过</span>}
      </div>
      <div className="wine-info">
        <div className="meta-row"><span>{wine.region}</span><i>·</i><span>{wine.grape}</span></div>
        <h3>{wine.name}</h3><p className="cn-name">{wine.cn} · {wine.vintage}</p>
        <div className="flavors">{wine.profile.slice(0,3).map(f => <span key={f}>{f}</span>)}</div>
        <div className="card-foot"><div><b>{wine.score}</b><span>专业评分</span></div><div className="mini-meter"><span>单宁</span><i><em style={{width:`${wine.tannin/5*100}%`}}/></i></div><ChevronRight size={18}/></div>
      </div>
    </button>
  </article>;
}

function WineDetail({ wine, profile, onClose, onUpdate }) {
  const [note, setNote] = useState(profile.note || '');
  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey); document.body.classList.add('modal-open');
    return () => {document.removeEventListener('keydown', onKey);document.body.classList.remove('modal-open');};
  }, [onClose]);
  return <div className="detail-layer" role="dialog" aria-modal="true">
    <button className="detail-backdrop" onClick={onClose} aria-label="关闭详情"/>
    <aside className="detail-panel">
      <button className="detail-close" onClick={onClose}><X size={20}/></button>
      <div className="detail-hero" style={{'--wine': wine.color, '--accent': wine.accent}}>
        <div className="detail-bottle"><div className="bottle"><div className="bottle-neck"><span/></div><div className="bottle-label"><small>{wine.country.toUpperCase()}</small><strong>{wine.monogram}</strong><i/><em>{wine.collection}</em><span>ESTATE SELECTION</span></div></div></div>
        <div className="detail-title"><p>{wine.type} · {wine.vintage}</p><h2>{wine.name}</h2><span>{wine.cn}</span><div className="detail-tags"><i><MapPin size={13}/>{wine.subregion}</i><i><Grape size={13}/>{wine.grape}</i></div></div>
      </div>
      <div className="detail-body">
        <section className="story-block"><div className="chapter"><span>CHAPTER 01</span><b>为什么值得认识</b></div><p>{wine.story}</p><blockquote><CalendarDays size={18}/><span><b>{wine.vintage} 年份札记</b>{wine.vintageNote}</span></blockquote></section>
        <section><div className="chapter"><span>CHAPTER 02</span><b>读懂它的结构</b></div><div className="sensory-grid">{sensory.map(s => <div className="sensory-item" key={s.key}><div><span>{s.label}</span><small>{s.hint}</small></div><div className="sensory-dots">{[1,2,3,4,5].map(n => <i key={n} className={n <= Math.round(wine[s.key]) ? 'filled' : ''}/>)}</div><em>{wine[s.key].toFixed(1)}</em></div>)}</div></section>
        <section><div className="chapter"><span>CHAPTER 03</span><b>记住它的气味</b></div><div className="aroma-wheel">{wine.profile.map((f,i)=><span key={f} style={{'--i':i}}><Droplets size={14}/>{f}</span>)}</div><div className="service-grid"><div><Clock3 size={18}/><span><small>适饮窗口</small><b>{wine.window}</b></span></div><div><Utensils size={18}/><span><small>餐桌搭配</small><b>{wine.pairing}</b></span></div></div></section>
        <section className="my-tasting"><div className="chapter"><span>MY TASTING</span><b>我的品鉴记录</b></div><div className="tasting-actions"><button className={profile.tried ? 'is-tried' : ''} onClick={() => onUpdate({tried: !profile.tried})}>{profile.tried ? <Check size={17}/> : <Wine size={17}/>} {profile.tried ? '已经喝过' : '标记为喝过'}</button><button className={profile.saved ? 'is-saved' : ''} onClick={() => onUpdate({saved: !profile.saved})}><Heart size={17} fill={profile.saved ? 'currentColor':'none'}/> {profile.saved ? '已收藏' : '想喝'}</button></div>
          <div className="rating-line"><span>我的评分</span><div>{[1,2,3,4,5].map(n => <button key={n} onClick={() => onUpdate({rating:n})} aria-label={`${n}星`}><Star size={22} fill={n <= (profile.rating||0) ? 'currentColor':'none'}/></button>)}</div><b>{profile.rating ? `${profile.rating}.0` : '—'}</b></div>
          <label className="note-box"><span><ScrollText size={15}/> 品鉴笔记</span><textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="这一杯让你想起什么？记录香气、口感或当时的故事…"/><button onClick={() => onUpdate({note})}>{profile.note === note && note ? '已保存' : '保存笔记'}</button></label>
        </section>
      </div>
    </aside>
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
