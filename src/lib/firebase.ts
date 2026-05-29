// Temporary dummy app to prevent crashes while firebase is installing
const app = {} as any;

export const auth = {
  onAuthStateChanged: (cb: any) => { cb(null); return () => {}; },
} as any;

export const db = {
  collection: () => ({
    doc: () => ({
      get: async () => ({ exists: () => false, data: () => ({}) }),
    }),
    get: async () => ({ forEach: () => {} }),
  })
} as any;

export const storage = {} as any;

export default app;
