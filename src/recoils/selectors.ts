// import { selector } from "recoil";
// import { getInt, setInt } from "../utils/settings";
// import { fontBibliaScalingState } from "./atoms";

// const getFontBibliaSelector = selector({
//     key: 'fontBibliaScalingSelector',
//     get: async ({ get }) => {
//         const newValue = get(fontBibliaScalingState);
//         const storeValue = await getInt('fbs', get(fontBibliaScalingState))

//         console.log('newValue: ', newValue, 'storeValue: ', storeValue);
//         if (storeValue == newValue)
//             return storeValue;
//         else
//             return await setInt('fbs', newValue)
//     },
// });


// export { getFontBibliaSelector }