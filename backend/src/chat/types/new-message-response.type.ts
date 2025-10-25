import { ModelRoles } from 'src/common/constants';

export type NewMessageResponseType = {
  role: ModelRoles;
  content: string;
  newAchievement: {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
  } | null;
};
