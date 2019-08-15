import create from 'zustand'
import { User } from 'firebase';

export type UserRole = 'instructors' | 'volunteers';

export interface Credentials {
    accessToken: String
}

export interface UserState {
    accessToken?: String,
    user?: User,
    signIn: (args: { user: User, credentials: Credentials, role: UserRole }) => void,
    signOut: () => void,
    role: UserRole | null,
}

const initialState = {
    accessToken: undefined,
    user: undefined,
    role: null,
} as const;

const [useUserStore, userStoreApi] = create<UserState>((set, _get) => ({
  ...initialState,
  signIn: ({ user, credentials, role }) => set(state => ({...state, user, accessToken: credentials.accessToken, role })),
  signOut: () => set(state => ({...state, ...initialState})),
}));

const isSignedIn = (state: UserState) => !!state.accessToken

export {
    useUserStore,
    userStoreApi,
    isSignedIn,
};