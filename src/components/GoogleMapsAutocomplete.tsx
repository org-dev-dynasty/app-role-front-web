import { useEffect, useRef } from 'react';
import { Location } from '../context/institute/types';
import { useLoadScript } from '@react-google-maps/api';
import { envs } from '@/utils/envs';
import { Input } from './ui/input';

export interface AddressAutocompleteProps {
  onAddressSelect?: (location: Location) => void;
  placeholder?: string;
}

const AddressAutocomplete = ({
  onAddressSelect,
  placeholder,
}: AddressAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: envs.googleMapsUrl,
    libraries: ['places'],
  });

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      const autocomplete = new google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ['address'], // Sugestões de endereço
          componentRestrictions: { country: 'br' }, // Opcional: Restringir por país
        }
      );

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place && place.formatted_address) {
          const streetComponent = place.address_components?.find((component) =>
            component.types.includes('route')
          );
          const street = streetComponent?.long_name || 'Erro ao obter a rua';

          const zipComponent = place.address_components?.find((component) =>
            component.types.includes('postal_code')
          );
          const zip = zipComponent?.long_name || '00000-000';

          const latitude =
            place.geometry?.location?.lat().toString() || '(Lat)';
          const longitude =
            place.geometry?.location?.lng().toString() || '(Long)';
          const cityComponent = place.address_components?.find(
            (component) =>
              component.types.includes('locality') ||
              component.types.includes('administrative_area_level_2')
          );
          const city = cityComponent?.long_name || '(Cidade)';

          const neighborhoodComponent = place.address_components?.find(
            (component) =>
              component.types.includes('sublocality') ||
              component.types.includes('neighborhood')
          );
          const neighborhood = neighborhoodComponent?.long_name || '(Bairro)';

          onAddressSelect?.({
            street,
            zip,
            latitude,
            longitude,
            city,
            neighborhood,
            address: '',
            number: '',
            cep: '',
            state: ''
          }
          ); // Retorna o endereço e o CEP para o pai
        }
      });
    }
  }, [isLoaded, onAddressSelect]);

  if (loadError) {
    return <p>Erro ao carregar o Google Maps API: {loadError.message}</p>;
  }

  return (
    <Input
      ref={inputRef}
      type='text'
      placeholder={placeholder || 'Digite o endereço'}
      autoComplete='off'
    />
  );
};

export default AddressAutocomplete;
