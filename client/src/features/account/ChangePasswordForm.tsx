import { Password} from "@mui/icons-material";
import AccountFormWrapper from "./AccountFormWrapper";

import TextInput from "../../app/shared/components/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ChangePasswordSchema, changePasswordSchema } from "../../lib/schemas/changePasswordSchema";
import { useAccount } from "../../lib/hooks/useAccount";
import { toast } from "react-toastify";

export default function ChangePasswordForm() {
    const {changePassword, logoutUser} = useAccount();
        
    const onSubmit = async (data: ChangePasswordSchema) => {
        try {
            await changePassword.mutateAsync(data, {
                onSuccess: () => {
                    toast.success('Your password has been changed');
                    logoutUser.mutate('/login');
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AccountFormWrapper<ChangePasswordSchema>
            title="Change Password"
            icon={<Password fontSize="large" />}
            onSubmit={onSubmit}
            submitButtonText="Update password"
            resolver={zodResolver(changePasswordSchema)}
            reset={true}
        >
            <TextInput type="password" label='Current Password' name="currentPassword" />
            <TextInput type="password" label='New Password' name="newPassword" />
            <TextInput type="password" label='Confirm Password' name="confirmPassword" />
        </AccountFormWrapper>
    )
}