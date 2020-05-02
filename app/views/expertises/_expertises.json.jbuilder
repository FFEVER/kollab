json.array! expertises do |expertise|
  json.partial! "expertises/expertise", expertise: expertise
end
