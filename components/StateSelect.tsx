import { Select, FormControl, Input, CheckIcon } from 'native-base';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

const states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

export function StateSelect({ label, onChange } : { label: string, onChange: (selected : string) => {} }) {
  const colorScheme = useColorScheme();
  const [state, setState] = useState();

  return (
    <FormControl minW="80" w="100%" maxW="300px">
      <FormControl.Label>State</FormControl.Label>
      <Select color={Colors[colorScheme ?? 'light'].text} selectedValue={state} minWidth="200" accessibilityLabel="State" placeholder="State" _selectedItem={{
      bg: "teal.600",
      endIcon: <CheckIcon size="5" />
    }} mt={1} onValueChange={itemValue => onChange(itemValue)}>
        {
          states.map((state) => {
            return (<Select.Item label={state} value={state} />);
          })
        }
      </Select>
    </FormControl>
  );
}