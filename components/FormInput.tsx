import { Button, Icon, Box, FormControl, Input, WarningOutlineIcon } from 'native-base';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export function FormInput({ label } : { label: string }) {
  const colorScheme = useColorScheme();
  return (
    <FormControl minW="80" w="100%" maxW="300px">
      <FormControl.Label>{label}</FormControl.Label>
      <Input color={Colors[colorScheme ?? 'light'].text} placeholder={`${label}...`} />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        Try different from previous passwords.
      </FormControl.ErrorMessage>
    </FormControl>
  );
}