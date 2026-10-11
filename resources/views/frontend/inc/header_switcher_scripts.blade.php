{{-- Shared by headers with inline switcher controls, regardless of their database IDs. --}}
<script>
    function changeLanguage(code) {
        $.post('{{ route('language.change') }}', {
            _token: '{{ csrf_token() }}',
            locale: code
        }, function () {
            location.reload();
        });
    }

    function changeCurrency(code) {
        $.post('{{ route('currency.change') }}', {
            _token: '{{ csrf_token() }}',
            currency_code: code
        }, function () {
            location.reload();
        });
    }
</script>
