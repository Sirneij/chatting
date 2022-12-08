from django.core.serializers.json import Serializer

# FYI: It can be any of the following as well:
# from django.core.serializers.pyyaml import Serializer
# from django.core.serializers.python import Serializer
# from django.core.serializers.json import Serializer

JSON_ALLOWED_OBJECTS = (dict, list, tuple, str, int, bool)


class CustomSerializer(Serializer):
    def end_object(self, obj):
        for field in self.selected_fields:
            if field == 'pk':
                continue
            elif field in self._current.keys():
                continue
            else:
                try:
                    if '__' in field:
                        fields = field.split('__')
                        value = obj
                        for f in fields:
                            value = getattr(value, f)
                        if value != obj and isinstance(value, JSON_ALLOWED_OBJECTS) or value == None:
                            self._current[field] = value

                except AttributeError:
                    pass
        super(CustomSerializer, self).end_object(obj)
