import { type FieldValues } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount"
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import AccountFormWrapper from "./AccountFormWrapper";
import { forgotPasswordSchema, type ForgotPasswordSchema } from "../../lib/schemas/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ForgotPasswordForm() {
    const { forgotPassword } = useAccount();
    const navigate = useNavigate();

    const onSubmit = async (data: FieldValues) => {
        try {
            await forgotPassword.mutateAsync(data.email, {
                onSuccess: () => {
                    toast.success('Password reset requested - please check your email');
                    navigate('/login');
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AccountFormWrapper<ForgotPasswordSchema>
            title="Please enter your email address"
            icon={<LockOpen fontSize="large" />}
            submitButtonText="Request password reset link"
            resolver={zodResolver(forgotPasswordSchema)}
            onSubmit={onSubmit}
            reset={true}
        >            
            {/* <TextInput rules={{required: true}} label='Email address' name='email' /> */}
            <TextInput label='Email' name='email' />
        </AccountFormWrapper>
    )
}