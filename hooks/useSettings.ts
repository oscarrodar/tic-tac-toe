import { useState, useEffect, useCallback } from 'react';
import { Settings } from '../types';
import { loadSettings, saveSettings, defaultSettings } from '../utils/storage';

interface UseSettingsReturn {
  settings: Settings;
  isLoading: boolean;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => Promise<void>;
  resetSettings: () => Promise<void>;
}

export function useSettings(): UseSettingsReturn {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const loaded = await loadSettings();
      setSettings(loaded);
      setIsLoading(false);
    }
    load();
  }, []);

  const updateSetting = useCallback(
    async <K extends keyof Settings>(key: K, value: Settings[K]) => {
      const newSettings = { ...settings, [key]: value };
      setSettings(newSettings);
      await saveSettings(newSettings);
    },
    [settings]
  );

  const resetSettings = useCallback(async () => {
    setSettings(defaultSettings);
    await saveSettings(defaultSettings);
  }, []);

  return {
    settings,
    isLoading,
    updateSetting,
    resetSettings,
  };
}
