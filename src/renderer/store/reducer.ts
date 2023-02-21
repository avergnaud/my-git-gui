/* State */
export interface State {
    repoSelected: boolean;
    currentWorkingDirectory: string,
};
export const initialState: State = {
    repoSelected: false,
    currentWorkingDirectory: ''
};

/* Actions */
export enum ActionType {
    SelectCWD,
    /* B */
};
export interface IActionSelectCWD {
    type: ActionType.SelectCWD,
    currentWorkingDirectory: string
};
export type IAction = IActionSelectCWD; /*| IActionB*/

/* reducer */
export const reducer = (state: State, action: IAction) :State => {
    const { type } = action;
    switch(type) {
        case ActionType.SelectCWD:
            return {
                ...state,
                repoSelected: true,
                currentWorkingDirectory: action.currentWorkingDirectory
            };
        default:
            return state;
    }
};