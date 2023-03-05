function saveDataToSyncStorage(data) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set(data, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve();
            }
        });
    });
}

async function getDataFromSyncStorage(keys) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(keys,data => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(data);
            }
        });
    });
}

const getTodayKey = () => {
    let currentDate = new Date();
    currentDate.setUTCHours(currentDate.getUTCHours() + 8);
    const isoDate = currentDate.toISOString();
    const yearMonthDay = isoDate.slice(0, 10);
    const date = yearMonthDay.replace(/-/g, '');
    console.log(isoDate)
    return `steps_${date}`;
}

export const getStepsSync = async () => {
    const key = getTodayKey();
    const stepsObj = await getDataFromSyncStorage(key);
    return stepsObj[key] ?? [];
}

export const setStepsSync = async (steps) => {
    const key = getTodayKey();
    await saveDataToSyncStorage({[key]:steps});
}
