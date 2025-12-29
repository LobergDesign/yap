export const useSettings = () => {
  const font = useState('settings-font', () => 'zt-nature');
  const theme = useState('settings-theme', () => 'default');
  const mode = useState('settings-mode', () => 'dark');

  const fonts = [
    { value: 'zt-nature', label: 'ZT Nature' },
    { value: 'nunito', label: 'Nunito Sans' },
  ];

  const themes = [
    { value: 'default', label: 'Default' },
    { value: 'theme-1', label: 'Theme 1' },
    { value: 'theme-2', label: 'Theme 2' },
    { value: 'theme-3', label: 'Theme 3' },
    { value: 'theme-4', label: 'Theme 4' },
  ];

  const applySettings = () => {
    if (import.meta.client) {
      const root = document.documentElement;
      root.setAttribute('data-font', font.value);
      root.setAttribute('data-theme', theme.value);
      root.setAttribute('data-mode', mode.value);

      localStorage.setItem('settings-font', font.value);
      localStorage.setItem('settings-theme', theme.value);
      localStorage.setItem('settings-mode', mode.value);
    }
  };

  const loadSettings = () => {
    if (import.meta.client) {
      const savedFont = localStorage.getItem('settings-font');
      const savedTheme = localStorage.getItem('settings-theme');
      const savedMode = localStorage.getItem('settings-mode');

      if (savedFont && fonts.some((f) => f.value === savedFont)) {
        font.value = savedFont;
      }
      if (savedTheme && themes.some((t) => t.value === savedTheme)) {
        theme.value = savedTheme;
      }
      if (savedMode && ['light', 'dark'].includes(savedMode)) {
        mode.value = savedMode;
      }

      applySettings();
    }
  };

  return {
    font,
    theme,
    mode,
    fonts,
    themes,
    applySettings,
    loadSettings,
  };
};
