import { BaseModal } from '@/components/molecules/BaseModal';
import { ContentContainer } from '@/components/molecules/BaseModal/ContentContainer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/molecules/Button';
import { useGetUserForAdmin } from '@/api/hooks/useUserAPI';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { User } from '@/interfaces/user';
import { UserCard } from '@/components/molecules/UserCard';

export interface SearchUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBlockUser: (id: string) => () => void;
  onUnblockUser: (id: string) => () => void;
}

export const SearchUserModal = ({ isOpen, onClose, onBlockUser, onUnblockUser }: SearchUserModalProps) => {
  const [value, setValue] = useState<string>('');
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | undefined | null>(undefined);

  useEffect(() => {
    if (isOpen) {
      setValue('');
      setEmail(undefined);
      setUsername(undefined);
      setUser(undefined);
    }
  }, [isOpen]);

  const searchUser = useGetUserForAdmin(
    { username, email, notStaff: true },
    {
      onSuccess: (data) => {
        setUser(data.user);
      }
    }
  );
  const onSearchUser = () => {
    searchUser.refetch();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (user === null) {
      setUser(undefined);
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(newValue)) {
      setEmail(newValue);
      setUsername(undefined);
    } else {
      setEmail(undefined);
      setUsername(newValue);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onCloseClick={onClose}>
      <ContentContainer>
        <Typography variant="cardTitle">Trouver un utilisateur avec son email ou son pseudonyme</Typography>
        <div className="flex gap-4">
          <Input type="text" placeholder="Email ou pseudonyme" value={value} onChange={handleChange} />
          <Button onClick={onSearchUser} disabled={!email && !username} className="w-fit">
            Rechercher
          </Button>
        </div>
        {user === null && <Typography variant="cardTitleSm">Aucun utilisateur trouvé</Typography>}
        {!!user && (
          <UserCard
            username={user.username}
            email={user.email}
            isBlocked={user.isBlocked}
            onBlockUser={onBlockUser(user.id)}
            onUnblockUser={onUnblockUser(user.id)}
          />
        )}
      </ContentContainer>
    </BaseModal>
  );
};
