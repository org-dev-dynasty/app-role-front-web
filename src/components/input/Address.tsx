import { Location } from '@/context/institute/types';
import { envs } from '@/utils/envs';
import { StandaloneSearchBox, useLoadScript } from '@react-google-maps/api';
import { useRef } from 'react';
import { Input } from '../ui/input';

type StringLocationObject = { [K in keyof Location]: string };

interface AddressInputProps {
  // types?: string[];
  // country?: string;
  onChange: (location: StringLocationObject) => void;
}
type Library = 'places';
const libraries: Library[] = ['places'];

const AddressInput = ({
  // types = [],
  // country,
  onChange,
}: AddressInputProps) => {
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: envs.googleMapsUrl,
    libraries: libraries,
  });

  const autoCompletePlaceChanged = () => {
    if (!inputRef.current) return;

    const place = inputRef.current.getPlaces()?.[0];

    if (!place) return;

    console.log(place);

    const { long_name: address = '' } =
      place.address_components?.find((component) =>
        component.types.includes('route')
      ) || {};

    const { long_name: cep = '' } =
      place.address_components?.find((component) =>
        component.types.includes('postal_code')
      ) || {};

    const { long_name: number = '' } =
      place.address_components?.find((component) => {
        component.types.includes;
      }) || {};

    const { long_name: neighborhood = '' } =
      place.address_components?.find(
        (component) =>
          component.types.includes('sublocality') ||
          component.types.includes('neighborhood')
      ) || {};

    const { long_name: city = '' } =
      place.address_components?.find(
        (component) =>
          component.types.includes('locality') ||
          component.types.includes('administrative_area_level_2')
      ) || {};

    const { long_name: state = '' } =
      place.address_components?.find((component) => {
        component.types.includes('administrative_area_level_1');
      }) || {};

    const latitude = place.geometry?.location?.lat().toString() || '';
    const longitude = place.geometry?.location?.lng().toString() || '';

    onChange?.({
      address,
      cep,
      latitude,
      longitude,
      city,
      neighborhood,
      number,
      state,
    });
  };

  if (loadError) {
    return <p>Erro ao carregar o Google Maps API: {loadError.message}</p>;
  }

  if (!isLoaded) {
    return <p>Carregando input...</p>;
  }

  return (
    <StandaloneSearchBox
      onLoad={(ref) => (inputRef.current = ref)}
      onPlacesChanged={autoCompletePlaceChanged}
    >
      <Input autoComplete='off' />
    </StandaloneSearchBox>
  );
};

AddressInput.displayName = 'ImageInput';
export default AddressInput;
