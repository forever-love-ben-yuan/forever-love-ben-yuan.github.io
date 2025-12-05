/**
 * CONFIGURATION
 * 请填入 Supabase 的 URL 和 Anon Key
 */
const SUPABASE_URL = "https://nmknslhatkokomounxcz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ta25zbGhhdGtva29tb3VueGN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MTE5NDUsImV4cCI6MjA4MDQ4Nzk0NX0.YxH8ZqXaXwyS5PofqP3ZL3yZN0TjdwmBo4YernPdTUE";

// Check if configured
const isConfigured = !SUPABASE_URL.includes("YOUR_SUPABASE_URL");

// --- STATE MANAGEMENT ---
const state = {
  user: null, 
  usersMap: {}, 
  pages: [],
  blocks: [],
  activePageKey: 'home',
  editingBlock: null,
  isDemo: !isConfigured,
  appLauncherOpen: false  // 应用启动器是否打开
};

// --- CONFIG: BLOCK TYPES & RULES ---
const BLOCK_DEFINITIONS = {
  countdown: '⏳ 倒计时',
  mood_checkin: '😊 心情打卡',
  tiny_goals: '📝 小目标',
  visit_day_list: '🚆 见面计划',
  cooking_list: '🍳 做饭清单',
  backup_plan: '🛌 备选方案',
  timetable: '📅 课程表',
  memory_card: '📸 回忆卡片',
  habit_tracker: '🎯 习惯打卡',
  challenge_tracker: '🔥 挑战进度',
  secret_note: '🔒 悄悄话',
  praise_jar: '🍬 夸夸瓶',
  gratitude_log: '🙏 感恩日记',
  date_idea_generator: '💡 约会灵感',
  question_of_week: '❓ 本周提问',
  decision_tool: '🎲 小决断',
  playlist: '🎵 歌单',
  song_of_week: '🎶 本周主打',
  outfit_card: '👗 穿搭记录'
};

const PAGE_BLOCK_RULES = {
  home: Object.keys(BLOCK_DEFINITIONS),
  together_days: ['visit_day_list', 'cooking_list', 'backup_plan', 'countdown'],
  schedule: ['timetable', 'countdown'],
  memories: ['memory_card', 'countdown'],
  goals: ['habit_tracker', 'challenge_tracker', 'tiny_goals'],
  messages: ['secret_note', 'praise_jar', 'gratitude_log'],
  fun: ['date_idea_generator', 'question_of_week', 'decision_tool'],
  soundtrack: ['playlist', 'song_of_week'],
  outfits: ['outfit_card']
};

// --- MOCK DATA ---
const MOCK_USERS = [
  { id: 'u1', username: 'benben', display_name: '笨笨' },
  { id: 'u2', username: 'yuanyuan', display_name: '圆圆' }
];

const MOCK_DATA = {
  pages: [
    { id: 'p1', key: 'home', title: '🏠 首页', description: '我们的云端小窝' },
    { id: 'p2', key: 'together_days', title: '📅 在一起', description: '见面计划 & 安排' },
    { id: 'p3', key: 'schedule', title: '⏰ 时间表', description: '课表 & 空闲时间' },
    { id: 'p4', key: 'memories', title: '📸 回忆墙', description: '点点滴滴' },
    { id: 'p5', key: 'goals', title: '🎯 目标', description: '一起变好' },
    { id: 'p6', key: 'messages', title: '💌 悄悄话', description: '只说给你听' },
    { id: 'p7', key: 'fun', title: '🎲 小玩法', description: '无聊时候玩一玩' },
    { id: 'p8', key: 'soundtrack', title: '🎵 歌单', description: 'BGM' },
    { id: 'p9', key: 'outfits', title: '👗 穿搭', description: 'OOTD 日记' },
  ],
  blocks: [
    { id: 'b1', page_id: 'p1', type: 'countdown', order_index: 0, created_by: 'u1', created_at: '2023-10-01T10:00:00Z', last_updated_by: 'u1', last_updated_at: '2023-10-01T10:00:00Z', data: { label: '距离下次见面', target: '2023-12-31T18:00' } },
    { id: 'b2', page_id: 'p1', type: 'mood_checkin', order_index: 1, created_by: 'u2', created_at: '2023-10-02T09:00:00Z', last_updated_by: 'u2', last_updated_at: '2023-10-02T09:30:00Z', data: { ben_mood: '😊', yuan_mood: '🐷', note: '想吃火锅了' } },
    { id: 'b3', page_id: 'p1', type: 'tiny_goals', order_index: 2, created_by: 'u2', created_at: '2023-10-03T08:00:00Z', last_updated_by: 'u2', last_updated_at: '2023-10-03T08:00:00Z', data: { title: '本周小目标', items: [{text: '视频通话 3 次', done: true}, {text: '一起看电影', done: false}] } },
    { id: 'b4', page_id: 'p2', type: 'visit_day_list', order_index: 0, created_by: 'u1', created_at: '2023-10-04T10:00:00Z', last_updated_by: 'u1', last_updated_at: '2023-10-04T10:00:00Z', data: { date: '2023-11-24', plan: '接站 -> 超市买菜 -> 回家做饭' } },
    { id: 'b5', page_id: 'p6', type: 'secret_note', order_index: 0, created_by: 'u2', created_at: '2023-10-05T12:00:00Z', last_updated_by: 'u2', last_updated_at: '2023-10-05T12:00:00Z', data: { cover: '点外卖不知道吃什么的时候打开', content: '去吃上次那家黄焖鸡米饭！加辣！' } },
    { id: 'b6', page_id: 'p9', type: 'outfit_card', order_index: 0, created_by: 'u2', created_at: '2023-10-06T14:00:00Z', last_updated_by: 'u2', last_updated_at: '2023-10-06T14:00:00Z', data: { date: '2023-10-20', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80', tags: '约会, 秋天', note: '新买的风衣！' } },
    { id: 'b7', page_id: 'p4', type: 'memory_card', order_index: 0, created_by: 'u1', created_at: '2023-10-07T16:00:00Z', last_updated_by: 'u1', last_updated_at: '2023-10-07T16:00:00Z', data: { date: '2023-09-01', title: '第一次去海边', content: '虽然风很大，但是很开心。', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80' } },
    { id: 'b8', page_id: 'p3', type: 'timetable', order_index: 0, created_by: 'u1', created_at: '2023-10-08T09:00:00Z', last_updated_by: 'u2', last_updated_at: '2023-10-09T10:00:00Z', data: { title: 'Benben的课表', content: '周一: 上午没课, 下午 Java\n周二: 全天满课 (哭)' } },
    { id: 'b9', page_id: 'p7', type: 'decision_tool', order_index: 0, created_by: 'u2', created_at: '2023-10-10T11:00:00Z', last_updated_by: 'u2', last_updated_at: '2023-10-10T11:00:00Z', data: { question: '今天谁洗碗？', options: '我, 你, 石头剪刀布' } }
  ]
};

// --- API LAYER ---
const api = {
  getHeaders: () => ({
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  }),

  async login(username, password) {
    if (state.isDemo) {
      const user = MOCK_USERS.find(u => u.username === username);
      if (user && ((username === 'benben' && password === '200111') || (username === 'yuanyuan' && password === '686868'))) {
        return user;
      }
      throw new Error('Demo login failed');
    }
    const url = `${SUPABASE_URL}/rest/v1/users?username=eq.${username}&password=eq.${password}&select=*`;
    const res = await fetch(url, { headers: this.getHeaders() });
    const data = await res.json();
    if (data && data.length > 0) return data[0];
    throw new Error('Login failed');
  },

  async fetchUsers() {
    if (state.isDemo) return MOCK_USERS;
    const res = await fetch(`${SUPABASE_URL}/rest/v1/users?select=id,display_name`, { headers: this.getHeaders() });
    return await res.json();
  },

  async fetchPages() {
    if (state.isDemo) return MOCK_DATA.pages;
    const res = await fetch(`${SUPABASE_URL}/rest/v1/pages?select=*&order=title.asc`, { headers: this.getHeaders() });
    return await res.json();
  },

  async fetchBlocks() {
    if (state.isDemo) return MOCK_DATA.blocks;
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blocks?select=*&order=order_index.asc`, { headers: this.getHeaders() });
    return await res.json();
  },

  async updateBlock(id, data) {
    const now = new Date().toISOString();
    if (state.isDemo) {
      const idx = state.blocks.findIndex(b => b.id === id);
      if (idx !== -1) {
        state.blocks[idx].data = data;
        state.blocks[idx].last_updated_by = state.user.id;
        state.blocks[idx].last_updated_at = now;
      }
      return state.blocks[idx];
    }
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blocks?id=eq.${id}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify({ data, last_updated_by: state.user.id, last_updated_at: now })
    });
    return await res.json();
  },

  async createBlock(blockData) {
    if (state.isDemo) {
      const now = new Date().toISOString();
      const newBlock = { 
        id: 'new_' + Date.now(), 
        ...blockData, 
        created_at: now, 
        last_updated_at: now,
        last_updated_by: state.user.id 
      };
      state.blocks.push(newBlock);
      return [newBlock];
    }
    
    // 验证用户 ID 是有效的 UUID（如果不是 demo 模式）
    if (!state.user || !state.user.id) {
      throw new Error('用户未登录，请先登录');
    }
    
    // UUID 格式验证
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(state.user.id)) {
      throw new Error('用户 ID 格式错误。请清除浏览器缓存并重新登录。');
    }
    
    // 确保包含所有必需的字段
    const now = new Date().toISOString();
    const payload = {
      ...blockData,
      created_at: blockData.created_at || now,
      last_updated_at: blockData.last_updated_at || now,
      last_updated_by: blockData.last_updated_by || state.user.id
    };
    
    // 移除 id 字段（如果存在），让数据库自动生成
    delete payload.id;
    
    // 确保 data 字段是对象格式（JSONB）
    if (payload.data && typeof payload.data === 'string') {
      try {
        payload.data = JSON.parse(payload.data);
      } catch (e) {
        console.warn('Failed to parse data field:', e);
      }
    }
    
    console.log('Creating block with payload:', payload);
    
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blocks`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    
    if (!res.ok) {
      let errorData;
      try {
        errorData = await res.json();
      } catch (e) {
        errorData = { message: `HTTP ${res.status}: ${res.statusText}` };
      }
      const errorMsg = errorData.message || errorData.hint || errorData.details || `HTTP ${res.status}: ${res.statusText}`;
      console.error('Create block error:', {
        status: res.status,
        statusText: res.statusText,
        error: errorData,
        payload: payload
      });
      throw new Error(errorMsg);
    }
    
    const result = await res.json();
    return Array.isArray(result) ? result : [result];
  },

  async deleteBlock(id) {
    if (state.isDemo) {
      state.blocks = state.blocks.filter(b => b.id !== id);
      return;
    }
    await fetch(`${SUPABASE_URL}/rest/v1/blocks?id=eq.${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
  }
};

// --- DOM HELPERS ---
const $ = (sel) => document.querySelector(sel);
const el = (tag, props = {}, children = []) => {
  const element = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k.startsWith('on') && typeof v === 'function') element.addEventListener(k.substring(2).toLowerCase(), v);
    else if (k === 'class') element.className = v;
    else if (k === 'value') element.value = v;
    else element.setAttribute(k, v);
  });
  if (!Array.isArray(children)) children = [children];
  children.forEach((child) => {
    if (typeof child === 'string' || typeof child === 'number') element.appendChild(document.createTextNode(String(child)));
    else if (child) element.appendChild(child);
  });
  return element;
};

// Helper: Format Date
const formatDate = (isoString) => {
  if (!isoString) return '';
  const d = new Date(isoString);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getMonth() + 1}月${d.getDate()}日 ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// --- RENDERERS ---
const BlockRenderers = {
  countdown: (data) => {
    const target = new Date(data.target || Date.now());
    const diff = Math.ceil((target.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    const isPast = diff < 0;
    return el('div', { class: 'text-center' }, [
      el('div', { class: 'text-sm text-light mb-2' }, data.label || '倒计时'),
      el('div', { class: 'countdown-display' }, [
        el('div', { class: 'countdown-item' }, [
          el('div', { class: 'countdown-num' }, isPast ? Math.abs(diff) : diff), 
          el('div', { class: 'countdown-label' }, isPast ? '天 (已过)' : '天')
        ])
      ])
    ]);
  },
  
  mood_checkin: (data) => {
    return el('div', {}, [
      el('div', { class: 'mood-grid' }, [
        el('div', { class: 'mood-box' }, [el('span', { class: 'mood-emoji' }, data.ben_mood || '😐'), el('span', { class: 'text-xs' }, '笨笨')]),
        el('div', { class: 'mood-box' }, [el('span', { class: 'mood-emoji' }, data.yuan_mood || '😐'), el('span', { class: 'text-xs' }, '圆圆')])
      ]),
      el('div', { class: 'text-center text-sm text-light mt-2 italic' }, data.note || '')
    ]);
  },

  tiny_goals: (data) => {
    const items = data.items || [];
    return el('div', {}, [
      el('h4', { class: 'font-bold mb-2' }, data.title || '小目标'),
      el('div', {}, items.map(item => 
        el('div', { class: 'goal-item' }, [
          el('input', { type: 'checkbox', class: 'checkbox-custom', checked: !!item.done, disabled: true }),
          el('span', { style: item.done ? 'text-decoration: line-through; color: #999' : '' }, item.text)
        ])
      ))
    ]);
  },

  visit_day_list: (data) => {
    return el('div', {}, [
      el('div', { class: 'font-bold text-primary mb-1' }, `📅 ${data.date || '未定日期'}`),
      el('div', { class: 'text-sm bg-stone-50 p-2 rounded' }, data.plan || '暂无计划')
    ]);
  },

  secret_note: (data) => {
    const content = el('div', { class: 'hidden p-4 bg-rose-50 rounded text-rose-800 mt-2 whitespace-pre-wrap' }, data.content || '');
    const cover = el('div', { class: 'secret-note-cover', onclick: () => {
      cover.classList.add('hidden');
      content.classList.remove('hidden');
    }}, [
      el('span', {}, '🔒 '),
      el('span', {}, data.cover || '点击展开')
    ]);
    return el('div', {}, [cover, content]);
  },

  outfit_card: (data) => {
    return el('div', {}, [
      data.image ? el('div', { class: 'mb-2 rounded overflow-hidden', style: 'max-height: 300px;' }, [
        el('img', { src: data.image, class: 'w-full h-full object-cover' })
      ]) : null,
      el('div', { class: 'flex justify-between items-center mb-1' }, [
        el('span', { class: 'font-bold text-sm' }, data.date || ''),
        el('span', { class: 'text-xs text-stone-400 bg-stone-100 px-2 py-1 rounded' }, data.tags || 'OOTD')
      ]),
      el('p', { class: 'text-sm text-stone-600' }, data.note || '')
    ]);
  },

  memory_card: (data) => {
    return el('div', {}, [
       data.image ? el('div', { class: 'mb-2 rounded overflow-hidden h-40' }, [
        el('img', { src: data.image, class: 'w-full h-full object-cover' })
      ]) : null,
      el('div', { class: 'font-bold text-rose-500' }, data.date || ''),
      el('h4', { class: 'font-bold mb-1' }, data.title || ''),
      el('p', { class: 'text-sm text-stone-600' }, data.content || '')
    ]);
  },

  timetable: (data) => {
    // 如果使用新的数据结构（courses数组）
    if (data.courses && Array.isArray(data.courses)) {
      const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      const coursesByDay = {};
      
      // 按天分组课程
      data.courses.forEach(course => {
        if (!coursesByDay[course.day]) {
          coursesByDay[course.day] = [];
        }
        coursesByDay[course.day].push(course);
      });
      
      return el('div', {}, [
        el('h4', { class: 'font-bold mb-3' }, data.title || '课程表'),
        el('div', { class: 'space-y-3' }, days.map(day => {
          const dayCourses = coursesByDay[day] || [];
          if (dayCourses.length === 0) return null;
          
          return el('div', { class: 'bg-stone-50 rounded p-3' }, [
            el('div', { class: 'font-bold text-sm mb-2 text-rose-500' }, day),
            el('div', { class: 'space-y-2' }, dayCourses.map(course => 
              el('div', { class: 'flex items-start gap-2 text-sm' }, [
                el('span', { class: 'text-stone-500 min-w-[100px]' }, course.time || ''),
                el('span', { class: 'font-medium flex-1' }, course.name || ''),
                course.location ? el('span', { class: 'text-stone-400 text-xs' }, course.location) : null
              ])
            ))
          ]);
        }).filter(Boolean))
      ]);
    }
    
    // 兼容旧的数据格式（content文本）
    return el('div', {}, [
      el('h4', { class: 'font-bold mb-2' }, data.title || '课程表'),
      el('div', { class: 'p-3 bg-stone-50 rounded text-sm whitespace-pre-wrap font-mono' }, data.content || '')
    ]);
  },

  decision_tool: (data) => {
    return el('div', {}, [
      el('h4', { class: 'font-bold mb-2 text-rose-500' }, data.question || '做个决定'),
      el('button', { class: 'btn btn-secondary w-full text-sm', onclick: (e) => {
        const options = (data.options || '是,否').split(/[,，]/);
        const choice = options[Math.floor(Math.random() * options.length)];
        e.target.textContent = `✨ 决定是：${choice} ✨`;
      }}, '🎲 帮我选一个')
    ]);
  },

  default: (data) => {
    const keys = Object.keys(data);
    if(keys.length === 0) return el('div', {class: 'text-stone-400 italic text-sm'}, '空内容');
    return el('div', { class: 'p-2 text-sm space-y-1' }, keys.map(k => 
      el('div', {}, [el('strong', {}, k + ': '), el('span', {}, String(data[k]))])
    ));
  }
};

// --- EDIT FORMS ---
const EditForms = {
  countdown: (data, onChange) => el('div', {}, [
    el('div', { class: 'form-group' }, [el('label', { class: 'form-label' }, '标题'), el('input', { class: 'input', value: data.label || '', oninput: (e) => onChange({...data, label: e.target.value}) })]),
    el('div', { class: 'form-group' }, [el('label', { class: 'form-label' }, '目标日期'), el('input', { class: 'input', type: 'datetime-local', value: data.target || '', oninput: (e) => onChange({...data, target: e.target.value}) })])
  ]),
  mood_checkin: (data, onChange) => el('div', {}, [
    el('div', { class: 'form-group' }, [el('label', { class: 'form-label' }, '笨笨心情 (Emoji)'), el('input', { class: 'input', value: data.ben_mood || '', oninput: (e) => onChange({...data, ben_mood: e.target.value}) })]),
    el('div', { class: 'form-group' }, [el('label', { class: 'form-label' }, '圆圆心情 (Emoji)'), el('input', { class: 'input', value: data.yuan_mood || '', oninput: (e) => onChange({...data, yuan_mood: e.target.value}) })]),
    el('div', { class: 'form-group' }, [el('label', { class: 'form-label' }, '备注'), el('input', { class: 'input', value: data.note || '', oninput: (e) => onChange({...data, note: e.target.value}) })])
  ]),
  tiny_goals: (data, onChange) => {
    const items = data.items || [];
    const updateItem = (idx, field, val) => {
      const newItems = [...items];
      newItems[idx] = { ...newItems[idx], [field]: val };
      onChange({ ...data, items: newItems });
    };
    const addItem = () => onChange({ ...data, items: [...items, { text: '', done: false }] });
    
    return el('div', {}, [
      el('div', { class: 'form-group' }, [el('label', { class: 'form-label' }, '标题'), el('input', { class: 'input', value: data.title || '', oninput: (e) => onChange({...data, title: e.target.value}) })]),
      el('div', { class: 'form-group' }, [
        el('label', { class: 'form-label' }, '目标列表'),
        ...items.map((item, idx) => el('div', { class: 'flex gap-2 mb-2' }, [
          el('input', { type: 'checkbox', class: 'checkbox-custom', checked: !!item.done, onchange: (e) => updateItem(idx, 'done', e.target.checked) }),
          el('input', { class: 'input', value: item.text, oninput: (e) => updateItem(idx, 'text', e.target.value) })
        ])),
        el('button', { class: 'btn btn-ghost text-xs bg-stone-100 w-full', onclick: addItem }, '+ 添加一条')
      ])
    ]);
  },
  visit_day_list: (data, onChange) => el('div', {}, [
    el('div', { class: 'form-group' }, [el('label', { class: 'form-label' }, '日期'), el('input', { class: 'input', type: 'date', value: data.date || '', oninput: (e) => onChange({...data, date: e.target.value}) })]),
    el('div', { class: 'form-group' }, [el('label', { class: 'form-label' }, '计划详情'), el('textarea', { class: 'input', rows: 3, value: data.plan || '', oninput: (e) => onChange({...data, plan: e.target.value}) })])
  ]),
  secret_note: (data, onChange) => el('div', {}, [
    el('div', { class: 'form-group' }, [el('label', { class: 'form-label' }, '封面提示文字'), el('input', { class: 'input', value: data.cover || '', oninput: (e) => onChange({...data, cover: e.target.value}) })]),
    el('div', { class: 'form-group' }, [el('label', { class: 'form-label' }, '隐藏内容'), el('textarea', { class: 'input', rows: 3, value: data.content || '', oninput: (e) => onChange({...data, content: e.target.value}) })])
  ]),
  outfit_card: (data, onChange) => {
    // 处理文件上传
    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      // 检查文件类型
      if (!file.type.startsWith('image/')) {
        alert('请选择图片文件');
        return;
      }
      
      // 检查文件大小（限制为 5MB）
      if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过 5MB');
        return;
      }
      
      // 读取文件并转换为 base64
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        onChange({...data, image: base64});
      };
      reader.onerror = () => {
        alert('图片读取失败，请重试');
      };
      reader.readAsDataURL(file);
    };
    
    // 图片预览容器
    const previewContainer = el('div', { class: 'form-group' }, [
      el('label', { class: 'form-label' }, '图片'),
      el('div', { class: 'flex flex-col gap-2' }, [
        // 文件上传按钮
        el('input', { 
          type: 'file', 
          accept: 'image/*',
          capture: 'environment', // 移动端优先使用后置摄像头
          class: 'input text-sm',
          onchange: handleFileUpload
        }),
        // 图片预览
        data.image ? el('div', { class: 'mt-2' }, [
          el('img', { 
            src: data.image, 
            class: 'max-w-full max-h-48 rounded border border-stone-200',
            style: 'object-fit: contain;'
          }),
          el('button', {
            type: 'button',
            class: 'text-xs text-red-500 mt-1',
            onclick: () => {
              const newData = {...data, image: ''};
              onChange(newData);
              const container = document.getElementById('edit-form-container');
              if (container && container.onChangeWithRerender) {
                container.onChangeWithRerender(newData);
              }
            }
          }, '删除图片')
        ]) : null
      ])
    ]);
    
    return el('div', {}, [
      el('div', { class: 'form-group' }, [el('label', { class: 'form-label' }, '日期'), el('input', { class: 'input', type: 'date', value: data.date || '', oninput: (e) => onChange({...data, date: e.target.value}) })]),
      previewContainer,
      el('div', { class: 'form-group' }, [el('label', { class: 'form-label' }, '标签'), el('input', { class: 'input', placeholder: '约会, 通勤...', value: data.tags || '', oninput: (e) => onChange({...data, tags: e.target.value}) })]),
      el('div', { class: 'form-group' }, [el('label', { class: 'form-label' }, '备注'), el('input', { class: 'input', value: data.note || '', oninput: (e) => onChange({...data, note: e.target.value}) })])
    ]);
  },
  memory_card: (data, onChange) => {
    // 处理文件上传（复用 outfit_card 的逻辑）
    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      // 检查文件类型
      if (!file.type.startsWith('image/')) {
        alert('请选择图片文件');
        return;
      }
      
      // 检查文件大小（限制为 5MB）
      if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过 5MB');
        return;
      }
      
      // 读取文件并转换为 base64
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        // 文件上传后需要更新数据并重新渲染以显示预览
        const newData = {...data, image: base64};
        onChange(newData);
        // 触发重新渲染以显示图片预览
        const container = document.getElementById('edit-form-container');
        if (container && container.onChangeWithRerender) {
          container.onChangeWithRerender(newData);
        }
      };
      reader.onerror = () => {
        alert('图片读取失败，请重试');
      };
      reader.readAsDataURL(file);
    };
    
    // 图片预览容器
    const previewContainer = el('div', { class: 'form-group' }, [
      el('label', { class: 'form-label' }, '图片'),
      el('div', { class: 'flex flex-col gap-2' }, [
        // 文件上传按钮
        el('input', { 
          type: 'file', 
          accept: 'image/*',
          capture: 'environment', // 移动端优先使用后置摄像头
          class: 'input text-sm',
          onchange: handleFileUpload
        }),
        // 图片预览
        data.image ? el('div', { class: 'mt-2' }, [
          el('img', { 
            src: data.image, 
            class: 'max-w-full max-h-48 rounded border border-stone-200',
            style: 'object-fit: contain;'
          }),
          el('button', {
            type: 'button',
            class: 'text-xs text-red-500 mt-1',
            onclick: () => {
              const newData = {...data, image: ''};
              onChange(newData);
              const container = document.getElementById('edit-form-container');
              if (container && container.onChangeWithRerender) {
                container.onChangeWithRerender(newData);
              }
            }
          }, '删除图片')
        ]) : null
      ])
    ]);
    
    return el('div', {}, [
      el('div', { class: 'form-group' }, [el('label', { class: 'form-label' }, '标题'), el('input', { class: 'input', value: data.title || '', oninput: (e) => onChange({...data, title: e.target.value}) })]),
      el('div', { class: 'form-group' }, [el('label', { class: 'form-label' }, '日期'), el('input', { class: 'input', type: 'date', value: data.date || '', oninput: (e) => onChange({...data, date: e.target.value}) })]),
      previewContainer,
      el('div', { class: 'form-group' }, [el('label', { class: 'form-label' }, '内容'), el('textarea', { class: 'input', rows: 2, value: data.content || '', oninput: (e) => onChange({...data, content: e.target.value}) })])
    ]);
  },
  timetable: (data, onChange) => {
    // 确保 courses 数组存在
    if (!data.courses || !Array.isArray(data.courses)) {
      // 如果没有 courses，尝试从 content 转换，或创建空数组
      data.courses = [];
      if (data.content) {
        // 可以保留 content 作为备用，但优先使用 courses
      }
    }
    
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    
    // 更新课程
    const updateCourse = (index, field, value) => {
      const newCourses = [...data.courses];
      newCourses[index] = { ...newCourses[index], [field]: value };
      onChange({ ...data, courses: newCourses });
    };
    
    // 删除课程
    const deleteCourse = (index) => {
      const newCourses = data.courses.filter((_, i) => i !== index);
      const newData = { ...data, courses: newCourses };
      onChange(newData);
      // 触发重新渲染以更新显示
      const container = document.getElementById('edit-form-container');
      if (container && container.onChangeWithRerender) {
        container.onChangeWithRerender(newData);
      }
    };
    
    // 添加课程
    const addCourse = () => {
      const newCourses = [...data.courses, { day: '周一', time: '', name: '', location: '' }];
      const newData = { ...data, courses: newCourses };
      onChange(newData);
      // 触发重新渲染以显示新添加的课程
      const container = document.getElementById('edit-form-container');
      if (container && container.onChangeWithRerender) {
        container.onChangeWithRerender(newData);
      }
    };
    
    return el('div', { class: 'space-y-4' }, [
      // 标题输入
      el('div', { class: 'form-group' }, [
        el('label', { class: 'form-label' }, '标题'),
        el('input', { 
          class: 'input', 
          value: data.title || '', 
          oninput: (e) => onChange({...data, title: e.target.value}) 
        })
      ]),
      
      // 课程列表
      el('div', { class: 'form-group' }, [
        el('label', { class: 'form-label mb-2' }, '课程安排'),
        el('div', { class: 'space-y-3' }, 
          data.courses.map((course, index) => 
            el('div', { class: 'p-3 border border-stone-200 rounded bg-stone-50' }, [
              el('div', { class: 'flex gap-2 mb-2' }, [
                // 星期选择
                el('select', {
                  class: 'input text-sm flex-1',
                  value: course.day || '周一',
                  onchange: (e) => updateCourse(index, 'day', e.target.value)
                }, days.map(day => el('option', { value: day }, day))),
                
                // 删除按钮
                el('button', {
                  type: 'button',
                  class: 'text-xs text-red-500 px-2',
                  onclick: () => deleteCourse(index)
                }, '删除')
              ]),
              
              // 时间输入
              el('div', { class: 'mb-2' }, [
                el('input', {
                  class: 'input text-sm',
                  placeholder: '时间，如：08:00-10:00',
                  value: course.time || '',
                  oninput: (e) => updateCourse(index, 'time', e.target.value)
                })
              ]),
              
              // 课程名称
              el('div', { class: 'mb-2' }, [
                el('input', {
                  class: 'input text-sm',
                  placeholder: '课程名称',
                  value: course.name || '',
                  oninput: (e) => updateCourse(index, 'name', e.target.value)
                })
              ]),
              
              // 地点（可选）
              el('div', {}, [
                el('input', {
                  class: 'input text-sm',
                  placeholder: '地点（可选）',
                  value: course.location || '',
                  oninput: (e) => updateCourse(index, 'location', e.target.value)
                })
              ])
            ])
          )
        ),
        
        // 添加课程按钮
        el('button', {
          type: 'button',
          class: 'btn btn-ghost text-xs w-full mt-2 border-dashed',
          onclick: addCourse
        }, '+ 添加课程')
      ])
    ]);
  },
  decision_tool: (data, onChange) => el('div', {}, [
    el('div', { class: 'form-group' }, [el('label', { class: 'form-label' }, '问题'), el('input', { class: 'input', value: data.question || '', oninput: (e) => onChange({...data, question: e.target.value}) })]),
    el('div', { class: 'form-group' }, [el('label', { class: 'form-label' }, '选项 (用逗号分隔)'), el('input', { class: 'input', value: data.options || '', oninput: (e) => onChange({...data, options: e.target.value}) })])
  ]),
  default: (data, onChange) => el('div', {}, [
    el('p', { class: 'text-xs text-red-500 mb-2' }, '该类型暂无专用编辑器，请直接修改 JSON'),
    el('textarea', { class: 'input', rows: 5, value: JSON.stringify(data), onchange: (e) => { try { onChange(JSON.parse(e.target.value)) } catch(err){} } })
  ])
}

// --- MAIN UI LOGIC ---

function logout() {
  // 清除用户数据和 localStorage
  state.user = null;
  localStorage.removeItem('currentUser');
  
  // 隐藏主视图，显示登录视图
  const loginView = $('#login-view');
  const mainView = $('#main-view');
  if (loginView) loginView.classList.remove('hidden');
  if (mainView) mainView.classList.add('hidden');
  
  // 清空表单
  const usernameInput = $('#username-input');
  const passwordInput = $('#password-input');
  if (usernameInput) usernameInput.value = '';
  if (passwordInput) passwordInput.value = '';
}

function init() {
  // 绑定登录表单事件
  const loginForm = $('#login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // 绑定退出按钮事件
  const logoutBtn = $('#logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }

  // 检查是否有保存的用户，如果有则自动登录
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      // 如果配置了 Supabase，但用户 ID 不是 UUID 格式（可能是旧的 mock 数据），清除它
      if (!state.isDemo && user.id) {
        // UUID 格式检查：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(user.id)) {
          console.warn('检测到旧的 mock 用户数据，已清除。请重新登录。');
          localStorage.removeItem('currentUser');
          // 确保显示登录页面
          const loginView = $('#login-view');
          const mainView = $('#main-view');
          if (loginView) loginView.classList.remove('hidden');
          if (mainView) mainView.classList.add('hidden');
          return; // 不自动登录，让用户重新登录
        }
      }
      // 有效的用户数据，自动登录
      state.user = user;
      showMainView();
    } catch (e) {
      console.error('Failed to parse saved user:', e);
      localStorage.removeItem('currentUser');
      // 确保显示登录页面
      const loginView = $('#login-view');
      const mainView = $('#main-view');
      if (loginView) loginView.classList.remove('hidden');
      if (mainView) mainView.classList.add('hidden');
    }
  } else {
    // 没有保存的用户，确保显示登录页面
    const loginView = $('#login-view');
    const mainView = $('#main-view');
    if (loginView) loginView.classList.remove('hidden');
    if (mainView) mainView.classList.add('hidden');
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const u = $('#username-input').value.trim();
  const p = $('#password-input').value.trim();
  try {
    const user = await api.login(u, p);
    state.user = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    showMainView();
  } catch (err) {
    alert('登录失败: 用户名或密码错误');
  }
}

async function showMainView() {
  const loginView = $('#login-view');
  const mainView = $('#main-view');
  if (loginView) loginView.classList.add('hidden');
  if (mainView) mainView.classList.remove('hidden');
  const userDisplay = $('#user-name-display');
  if (userDisplay) userDisplay.textContent = state.user.display_name;

  const users = await api.fetchUsers();
  users.forEach(u => state.usersMap[u.id] = u);

  state.pages = await api.fetchPages();
  state.blocks = await api.fetchBlocks();

  // 绑定应用启动器按钮
  const appLauncherBtn = $('#app-launcher-btn');
  if (appLauncherBtn) {
    appLauncherBtn.addEventListener('click', openAppLauncher);
  }
  
  // 初始化时显示首页
  state.activePageKey = 'home';
  renderNav();
  renderPage('home');
}

function renderNav() {
  // 导航栏始终隐藏（使用dock栏）
  const navContainer = document.querySelector('#nav-container')?.parentElement;
  if (navContainer) {
    navContainer.classList.add('hidden');
  }
}

function openAppLauncher() {
  state.appLauncherOpen = true;
  const menu = $('#app-launcher-menu');
  const appGrid = $('#app-grid');
  
  if (!menu || !appGrid) return;
  
  menu.classList.remove('hidden');
  appGrid.innerHTML = '';
  
  // 获取除home外的所有页面
  const otherPages = state.pages.filter(p => p.key !== 'home');
  
  otherPages.forEach(page => {
    const pageBlocks = state.blocks.filter(b => b.page_id === page.id);
    const blockCount = pageBlocks.length;
    
    const appItem = el('div', {
      class: 'flex flex-col items-center p-3 rounded-xl bg-stone-50 active:bg-stone-100 transition-colors cursor-pointer',
      onclick: () => {
        closeAppLauncher();
        state.activePageKey = page.key;
        renderPage(page.key);
      }
    }, [
      el('div', { class: 'text-3xl mb-2' }, page.title.split(' ')[0]), // emoji
      el('div', { class: 'text-xs font-medium text-center text-stone-700' }, page.title.split(' ').slice(1).join(' ')),
      blockCount > 0 ? el('div', { class: 'text-xs text-rose-500 mt-1' }, `${blockCount}`) : null
    ]);
    
    appGrid.appendChild(appItem);
  });
}

function closeAppLauncher() {
  state.appLauncherOpen = false;
  const menu = $('#app-launcher-menu');
  if (menu) {
    menu.classList.add('hidden');
  }
}

// 暴露到全局作用域，供 HTML onclick 使用
window.closeAppLauncher = closeAppLauncher;

function renderPage(key) {
  state.activePageKey = key;
  const page = state.pages.find(p => p.key === key);
  if (!page) return;

  const pageTitle = $('#page-title');
  const pageDesc = $('#page-desc');
  const container = $('#blocks-container');
  const addBlockBtn = document.querySelector('#main-view button[onclick="openAddBlockModal()"]');
  
  // 设置页面标题和描述
  if (pageTitle) pageTitle.textContent = page.title;
  if (pageDesc) pageDesc.textContent = page.description || '';
  
  // 如果是home页面，隐藏返回按钮；否则显示
  const backBtn = $('#back-to-home-btn');
  if (key === 'home') {
    if (backBtn) backBtn.classList.add('hidden');
  } else {
    if (backBtn) {
      backBtn.classList.remove('hidden');
      backBtn.onclick = () => {
        state.activePageKey = 'home';
        renderPage('home');
      };
    }
  }

  if (!container) return;
  container.innerHTML = '';

  const pageBlocks = state.blocks.filter(b => b.page_id === page.id).sort((a, b) => a.order_index - b.order_index);
  
  // 显示添加按钮
  if (addBlockBtn) addBlockBtn.style.display = 'block';

  pageBlocks.forEach(block => {
    const renderFn = BlockRenderers[block.type] || BlockRenderers.default;
    
    const creatorName = state.usersMap[block.created_by]?.display_name || '';
    const updaterName = state.usersMap[block.last_updated_by]?.display_name || '';
    
    const isEdited = block.last_updated_at && block.created_at && block.last_updated_at !== block.created_at;
    const createTime = formatDate(block.created_at);
    const updateTime = formatDate(block.last_updated_at);

    const blockEl = el('div', { class: 'block-card' }, [
      el('div', { class: 'block-header' }, [
        el('div', { class: 'flex items-center gap-2' }, [
          el('span', { class: 'text-xs text-stone-300 uppercase tracking-wider' }, BLOCK_DEFINITIONS[block.type] || block.type),
          creatorName ? el('span', { class: 'creator-tag' }, `From ${creatorName}`) : null
        ]),
        el('div', { class: 'block-actions flex gap-2' }, [
          el('button', { class: 'text-xs hover:text-primary', onclick: () => openEditModal(block) }, '编辑'),
          el('button', { class: 'text-xs hover:text-red-500', onclick: () => deleteBlock(block.id) }, '删除')
        ])
      ]),
      renderFn(block.data),
      
      el('div', { class: 'block-meta' }, [
        el('span', {}, createTime ? `${createTime} 创建` : ''),
        isEdited ? el('span', { class: 'ml-auto text-primary-soft' }, `✏️ ${updaterName} 修改于 ${updateTime}`) : null
      ])
    ]);
    container.appendChild(blockEl);
  });
}

function openEditModal(block) {
  let tempData = JSON.parse(JSON.stringify(block.data));
  const renderForm = EditForms[block.type] || EditForms.default;
  
  // 创建一个不重新渲染的 onChange 处理函数
  // 只在数据变化时更新 tempData，不重新渲染表单（避免输入框失焦）
  const handleChange = (newData) => {
    tempData = newData;
    // 不重新渲染，只更新数据，这样输入框不会失去焦点
  };
  
  // 创建一个需要重新渲染的 onChange 处理函数（用于文件上传等需要更新UI的场景）
  const handleChangeWithRerender = (newData) => {
    tempData = newData;
    const container = document.getElementById('edit-form-container');
    if (container) {
      container.innerHTML = '';
      container.appendChild(renderForm(tempData, handleChange));
    }
  };

  const modal = el('div', { class: 'edit-overlay' }, [
    el('div', { class: 'edit-modal' }, [
      el('h3', { class: 'font-bold mb-4' }, '编辑: ' + (BLOCK_DEFINITIONS[block.type] || block.type)),
      el('div', { id: 'edit-form-container' }, renderForm(tempData, handleChange)),
      el('div', { class: 'flex gap-2 mt-4 justify-end' }, [
        el('button', { class: 'btn btn-secondary', onclick: closeModal }, '取消'),
        el('button', { class: 'btn btn-primary', onclick: async () => {
          await api.updateBlock(block.id, tempData);
          if (state.isDemo) {
             renderPage(state.activePageKey);
          } else {
             state.blocks = await api.fetchBlocks();
             renderPage(state.activePageKey);
          }
          closeModal();
        }}, '保存')
      ])
    ])
  ]);

  const container = $('#modal-container');
  container.innerHTML = '';
  container.classList.remove('hidden');
  container.appendChild(modal);
  
  // 将重新渲染函数保存到容器上，供文件上传使用
  const formContainer = document.getElementById('edit-form-container');
  if (formContainer) {
    formContainer.onChangeWithRerender = handleChangeWithRerender;
  }
}

function openAddBlockModal() {
  const page = state.pages.find(p => p.key === state.activePageKey);
  
  const allowedTypes = PAGE_BLOCK_RULES[page.key] || PAGE_BLOCK_RULES['home'];
  const typeOptions = allowedTypes.filter(t => BLOCK_DEFINITIONS[t]);

  let selectedType = typeOptions[0] || 'countdown';

  const modal = el('div', { class: 'edit-overlay' }, [
    el('div', { class: 'edit-modal' }, [
      el('h3', { class: 'font-bold mb-4' }, '添加新积木'),
      el('div', { class: 'form-group' }, [
        el('label', { class: 'form-label' }, '选择类型'),
        el('select', { class: 'input', onchange: (e) => selectedType = e.target.value }, 
          typeOptions.map(t => el('option', { value: t }, BLOCK_DEFINITIONS[t] || t))
        )
      ]),
      el('p', { class: 'text-xs text-stone-400 mb-4' }, '注意：不同页面只能添加特定的积木哦'),
      el('div', { class: 'flex gap-2 mt-4 justify-end' }, [
        el('button', { class: 'btn btn-secondary', onclick: closeModal }, '取消'),
        el('button', { class: 'btn btn-primary', onclick: async () => {
          try {
            let initData = {};
            if (selectedType === 'countdown') initData = { label: '新倒计时', target: new Date().toISOString() };
            else if (selectedType === 'mood_checkin') initData = { ben_mood: '😐', yuan_mood: '😐' };
            else if (selectedType === 'tiny_goals') initData = { title: '本周目标', items: [{ text: '目标1', done: false }] };
            else if (selectedType === 'visit_day_list') initData = { date: new Date().toISOString().split('T')[0], plan: '计划...' };
            else if (selectedType === 'secret_note') initData = { cover: '点我展开', content: '写点悄悄话...' };
            else if (selectedType === 'outfit_card') initData = { date: new Date().toISOString().split('T')[0], tags: 'OOTD', image: '' };
            else if (selectedType === 'timetable') initData = { title: '我的课表', courses: [] };
            else if (selectedType === 'decision_tool') initData = { question: '今天谁洗碗？', options: '我, 你' };
            
            await api.createBlock({ 
              page_id: page.id, 
              type: selectedType, 
              order_index: 999, 
              data: initData,
              created_by: state.user.id
            });
            
            if (state.isDemo) {
              renderPage(state.activePageKey);
            } else {
              state.blocks = await api.fetchBlocks(); 
              renderPage(state.activePageKey);
            }
            closeModal();
          } catch (err) {
            console.error('Failed to create block:', err);
            alert('创建失败: ' + (err.message || '未知错误，请检查控制台'));
          }
        }}, '添加')
      ])
    ])
  ]);

  const container = $('#modal-container');
  container.innerHTML = '';
  container.classList.remove('hidden');
  container.appendChild(modal);
}

function closeModal() {
  const modal = $('#modal-container');
  if (modal) modal.classList.add('hidden');
}

async function deleteBlock(id) {
  if (confirm('确定要删除这个积木吗？')) {
    await api.deleteBlock(id);
    renderPage(state.activePageKey);
  }
}

init();