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
            @input="(e) => search = e.target.value"
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
                :class="{ 'is-selected': selectedOptions.includes(option) }"
                @click.stop="onSelect(option.id, selectedOptions.includes(option))"
                :key="option.id"
            >
                {{ option.label }}

                <i class="SelectBase_optionCheck fal fa-check"></i>
                <i class="SelectBase_optionRemove fal fa-times"></i>
            </div>

            <div
                class="SelectBase_option SelectBase_option--add"
                @click="$emit('add', search)"
                v-if="enableAdd && search && !searchExists"
            >
                <span>
                    <i class="fal fa-plus mr-10"></i> {{ $t('component.selectBase.add', { value: search }) }}
                </span>
            </div>

            <div class="SelectBase_option SelectBase_option--no-results" v-if="displayOptions.length <= 0 && !enableAdd">
                <span>
                    <i class="fal fa-times mr-10"></i> {{ $t('component.selectBase.noResults') }}
                </span>
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
        value: { type: [Number, Array] },
        constraints: { type: Array, default: () => [] },
        placeholder: { type: String, default: '' },
        enableMultiple: { type: Boolean, default: false },
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
        arrayValue () {
            return this.$props.value !== null ? (Array.isArray(this.$props.value) ? this.$props.value : [ this.$props.value ]) : []
        },
        searchExists () {
            return this.$props.options.find(o => o.label == this.$data.search) ? true : false
        },
        selectedOptions () {
            return this.$props.options.filter(o => this.arrayValue.includes(o.id))
        },
        displayValue () {
            return this.selectedOptions.length > 0 ? this.selectedOptions.map(o => o.label).join(', ') : ''
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
        displayValue (v) {
            if (this.$refs.search) this.$refs.search.value = v
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
    mounted () {
        if (this.displayValue) this.$refs.search.value = this.displayValue
    },
    methods: {
        onSelect (id, deselect = false) {
            if (!this.$props.enableMultiple) this.$data.state.isActive = false

            let total = this.$props.enableMultiple ? this.selectedOptions.map(o => o.id) : []
            
            if (deselect) {
                total = total.filter(o => o != id)
            } else {
                total.push(this.$props.options.find(o => o.id == id).id)
            }
            
            this.$emit('input', total.length > 0 ? (this.$props.enableMultiple ? total : total[0]) : null)
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
        }
    }
}
</script>