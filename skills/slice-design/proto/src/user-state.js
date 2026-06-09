// User-state context — pods read the active preset's data instead of
// hardcoding amounts (src/data/userStatePresets.js has the presets, the debug
// panel switches them). Default = the canonical preset, so a pod rendered
// outside the provider (tests, playground embeds) still shows the calibrated
// values.
import { createContext, useContext } from 'react';
import { getPreset } from './data/userStatePresets.js';

export const UserStateContext = createContext(getPreset('canonical').state);
export const useUserState = () => useContext(UserStateContext);
