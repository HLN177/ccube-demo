import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAuthModel } from '@/models/auth.models';
import type { AuthType } from '@/models/auth.models';

function VerificationPage() {
  const { t } = useTranslation();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.complycube.com/web-sdk/v1/complycube.min.js";
    script.async = true;
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "https://assets.complycube.com/web-sdk/v1/style.css";
    document.head.appendChild(script);
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(script);
      document.head.removeChild(style);
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<AuthType>({
    resolver: zodResolver(createAuthModel())
  });

  const onSubmit = async (event: AuthType) => {
    try {
      console.log(event);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          {t('name.title')}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box mb={2} sx={{ '& .MuiTextField-root': { m: 1 } }}>
            <TextField
              required
              autoFocus
              fullWidth
              variant="outlined"
              id="email"
              label={t('name.email')}
              error={!!errors?.email}
              helperText={errors?.email ? errors.email.message : null}
              {...register('email')}
            />
            <TextField
              required
              autoFocus
              fullWidth
              id="firstName"
              label={t('name.first_name')}
              error={!!errors?.firstName}
              helperText={errors?.firstName ? errors.firstName.message : null}
              {...register('firstName')}
            />
            <TextField
              required
              autoFocus
              fullWidth
              id="lastName"
              label={t('name.last_name')}
              error={!!errors?.lastName}
              helperText={errors?.lastName ? errors.lastName.message : null}
              {...register('lastName')}
            />
            <DateField
              {...register('dob')}
              onChange={(newValue) => {
                setValue("dob", newValue?.format("YYYY-MM-DD") || "");
              }}
              required
              label={t("name.date_of_birth")}
              format="YYYY-MM-DD"
              slotProps={{
                textField: {
                  error: !!errors.dob,
                  helperText: errors.dob?.message,
                },
              }}
              fullWidth
            />
          </Box>
          <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                size="large"
                type="submit"
              >
                {t('name.upload')}
              </Button>
          </Stack>
        </Box>
      </Container>
      <div id="complycube-mount"></div>
    </LocalizationProvider>
  )
}

export default VerificationPage