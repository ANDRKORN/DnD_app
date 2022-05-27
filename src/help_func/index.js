export function useDispatchData(value, dispatch) {
    if (!value) {
        throw new Error("got wrong parameters for useSaveData");
    }
    dispatch(value);
}
