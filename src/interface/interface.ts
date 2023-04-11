export interface ICard {
  userName: string | undefined;
  title: string | undefined;
  content: string | undefined;
}

export interface INavbar {
  currentUserId?: string | undefined;
}

export interface IForm {
  type: string;
  giveData(email: string, password: string, name?: string): Function;
  trpcError?: boolean;
}
