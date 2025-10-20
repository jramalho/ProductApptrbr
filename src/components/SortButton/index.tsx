import { Text } from 'react-native';
import * as S from './styles';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

interface SortButtonProps {
  name: string;
  icon: string;
  active: boolean;
  action: () => void;
  testID?: string;
}

const SortButton: React.FC<SortButtonProps> = ({ name, icon, active, action, testID }) => {
  const accessibilityLabel = `Sort by ${name}`;
  const accessibilityHint = active 
    ? `Currently sorting by ${name}. Double tap to remove sorting.`
    : `Double tap to sort by ${name}`;
  const accessibilityState = { selected: active };

  return (
    <S.Container 
      onPress={action} 
      active={active} 
      testID={testID}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={accessibilityState}
    >
      <Text importantForAccessibility="no-hide-descendants">{name}</Text>
      <FontAwesome6 
        name={icon} 
        iconStyle="solid" 
        importantForAccessibility="no-hide-descendants"
      />
    </S.Container>
  );
};

export default SortButton;
