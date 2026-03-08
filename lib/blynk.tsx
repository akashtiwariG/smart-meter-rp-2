const BLYNK_TOKEN = "d1i3GxNM_mDFyj5FDWoyEShpsR8ogdWf";
const BASE_URL = `https://blynk.cloud/external/api`;

export type SmartMeterData = {
  V0: number; // Voltage
  V1: number; // Current
  V2: number; // Power
  V3: number; // Energy
  V4: number; // Frequency
  V5: number; // Power Factor
};

const DEFAULT_DATA: SmartMeterData = {
  V0: 0,
  V1: 0,
  V2: 0,
  V3: 0,
  V4: 0,
  V5: 0,
};

// ✅ Fetch Dashboard Data (same as before)
export async function fetchBlynkData(): Promise<SmartMeterData> {
  try {
    const res = await fetch(`${BASE_URL}/getAll?token=${BLYNK_TOKEN}`);
    if (!res.ok) throw new Error("Failed to fetch Blynk data");
    const json = await res.json();

    return {
      V0: parseFloat(json.v0 ?? DEFAULT_DATA.V0.toString()),
      V1: parseFloat(json.v1 ?? DEFAULT_DATA.V1.toString()),
      V2: parseFloat(json.v2 ?? DEFAULT_DATA.V2.toString()),
      V3: parseFloat(json.v3 ?? DEFAULT_DATA.V3.toString()),
      V4: parseFloat(json.v4 ?? DEFAULT_DATA.V4.toString()),
      V5: parseFloat(json.v5 ?? DEFAULT_DATA.V5.toString()),
    };
  } catch (error) {
    console.error("Blynk fetch error:", error);
    return DEFAULT_DATA;
  }
}

/*  🔥 Relay Control API
    Read / Change the Relay State (V10)
*/

// Get Relay State → returns 1 or 0
export async function getRelayState(): Promise<number> {
  try {
    const res = await fetch(`${BASE_URL}/get?token=${BLYNK_TOKEN}&pin=V6`);
    const value = await res.text();
    return Number(value) === 1 ? 1 : 0;
  } catch (error) {
    console.error("Failed to get Relay State:", error);
    return 0;
  }
}

// Update Relay State in Blynk
export async function setRelayState(state: number): Promise<void> {
  try {
    await fetch(`${BASE_URL}/update?token=${BLYNK_TOKEN}&V6=${state}`);
  } catch (error) {
    console.error("Failed to update Relay State:", error);
  }
}
