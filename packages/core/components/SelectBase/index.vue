<template>
    <div class="SelectBase" :class="{ 'is-active': state.isActive }" @click="state.isActive = true">
        <label class="SelectBase_label" v-if="label">
            {{ label }}
        </label>

        <input
            type="text"
            class="SelectBase_value"
            :placeholder="placeholder"
            @focus="onFocus(true)"
            @blur="onFocus(false)"
            @input="(e) => onSearch(e.target.value)"
            :disabled="!enableSearch"
            ref="search"
        />

        <div class="Inputbase_helpers">
            <div class="Inputbase_helper">
                <i class="fal fa-angle-down"></i>
            </div>
        </div>

        <div class="SelectBase_options">
            <div
                v-for="option in displayOptions"
                class="SelectBase_option"
                @click.stop="onSelect(option.id)"
                :key="option.id"
            >
                {{ option.label }}
            </div>

            <div
                class="SelectBase_option SelectBase_option--add"
                @click="onAdd(search)"
                v-if="enableAdd && search && !searchExists"
            >
                <i class="fal fa-plus mr-10"></i> {{ $t('component.selectBase.add', { value: search }) }}
            </div>

            <div class="SelectBase_option SelectBase_option--no-results" v-if="displayOptions.length <= 0 && !enableAdd">
                <i class="fal fa-times mr-10"></i> {{ $t('component.selectBase.noResults') }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SelectBase',
    props: {
        label: { type: String, default: '' },
        options: { type: Array, default: () => [] },
        value: { type: Number },
        placeholder: { type: String, default: '' },
        enableSearch: { type: Boolean, default: false },
        enableAdd: { type: Boolean, default: false }
    },
    data: () => ({
        search: '',
        state: {
            isFocused: false,
            isActive: false
        },
        listeners: {
            active: null
        }
    }),
    computed: {
        searchExists () {
            return this.$props.options.find(o => o.label == this.$data.search) ? true : false
        },
        selectedOption () {
            return this.$props.options.find(o => o.id == this.$props.value)
        },
        displayValue () {
            return this.selectedOption && this.selectedOption.label ? this.selectedOption.label : null
        },
        displayOptions () {
            let options = this.$props.options

            if (this.$data.search) {
                options = options.filter(o => {
                    return o.label.toLowerCase().includes(this.$data.search.toLowerCase())
                })
            }
            
            return options
        }
    },
    watch: {
        displayValue: {
            immediate: true,
            handler (v) {
                if (v && this.$refs.search) this.$refs.search.value = v
            }
        },
        ['state.isActive'] (v) {
            if (v) {
                this.$listeners.active = (e) => {
                    if (!this.$el.contains(e.target)) this.$data.state.isActive = false
                }

                document.addEventListener('click', this.$listeners.active)
            } else {
                document.removeEventListener('click', this.$listeners.active)
                this.$listeners.active = null
            }
        }
    },
    methods: {
        onSelect (id) {
            this.$data.state.isActive = false
            this.$emit('input', id)
        },
        onFocus (toggle) {
            this.$data.state.isFocused = toggle

            if (toggle) {
                this.$refs.search.value = ''
            } else {
                setTimeout(() => {
                    this.$data.search = ''
                    this.$refs.search.value = this.displayValue ? this.displayValue : ''
                }, 100)
            }
        },
        onSearch (search) {
            this.$data.search = search
        },
        onAdd (search) {
            this.$emit('add', search)
        }
    }
}
</script>