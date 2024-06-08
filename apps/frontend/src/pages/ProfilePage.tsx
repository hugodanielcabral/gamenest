import { Layout } from "../components/layout/Layout";
import { BackgroundImage } from "../components/ui/backgroundImage/BackgroundImage";
import { CardBackground } from "../components/ui/cardBackground/CardBackground";
import { ProfileForm } from "../components/profile/form/ProfileForm";
import { ProfileAvatar } from "../components/profile/avatar/ProfileAvatar";
import { useProfile } from "../hooks/useProfile.js";
import { ProfileStats } from "../components/profile/stats/ProfileStats.js";
import { useProfileStats } from "../hooks/useProfileStats.js";
import profileBG from "../assets/backgrounds/profile-background.webp";

export const ProfilePage = () => {
  const {
    formData,
    data,
    editButton,
    handleCancelEdit,
    handleOnChange,
    handleOnSubmit,
    isLoading,
    toggleEditState,
    user,
    setFormData,
    selectedAvatar,
    setSelectedAvatar
  } = useProfile();
  const { profileStats } = useProfileStats();
  const { country_id, avatar, gender, birthday, title } = formData;
  

  return (
    <Layout>
      <BackgroundImage backgroundImage={profileBG}>
        <CardBackground className="bg-opacity-70 mx-auto space-y-10">
          <ProfileAvatar
            user={user}
            setFormData={setFormData}
            avatar={avatar}
            editButton={editButton}
            toggleEditState={toggleEditState}
            selectedAvatar={selectedAvatar}
            setSelectedAvatar={setSelectedAvatar}
          />
          <h2 className="text-2xl text-error text-center divider"></h2>
          <h3 className="text-center text-gray-300">Cambios de perfil disponibles: <span className="text-white">{user?.user_edit_credits}</span> (se reinicia cada dia a las 10 AM.)</h3>
          <div className="flex flex-col md:flex-row justify-evenly gap-x-5">
            <ProfileForm
              data={data}
              isLoading={isLoading}
              editButton={editButton}
              user={user}
              country_id={country_id}
              gender={gender}
              birthday={birthday}
              title={title}
              handleOnChange={handleOnChange}
              handleOnSubmit={handleOnSubmit}
              handleCancelEdit={handleCancelEdit}
            />
            <ProfileStats profileStats={profileStats} />
          </div>
        </CardBackground>
      </BackgroundImage>
    </Layout>
  );
};
