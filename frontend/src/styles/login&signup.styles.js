const commonLoginSignupStyles = {
  page: `flex text-center bg-gray-200 dark:bg-darkPrimary w-full min-h-[calc(100vh-5.5rem)] pt-5 transition-colors duration-200`,
  form: `max-w-md mx-auto my-auto p-6 bg-white dark:bg-darkSecondary dark:text-darkInputText  shadow-md rounded-lg
transition-colors duration-200 py-10`,
  title: `text-2xl font-bold text-blue-600 dark:text-darkTextPrimary transition-colors duration-200 mb-8`,
  email: `w-full p-2 mb-4 border  rounded-lg placeholder:text-gray-500 dark:placeholder:text-darkTextPlaceholder dark:bg-darkInputBackground transition-colors duration-200`,
  emailIcon: `size-6 absolute right-3 top-1/2 -translate-y-5 text-gray-500 dark:text-darkTextPlaceholder`,
  password: `w-full p-2 border  rounded-lg placeholder:text-gray-500 dark:placeholder:text-darkTextPlaceholder dark:bg-darkInputBackground transition-colors duration-200`,
  passwordIcon: `size-6 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-darkTextPlaceholder`,
  showPassword: `w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-darkInputBackground dark:border-gray-600 dark:accent-darkEditButton`,
  errorMessage: `w-full p-2 mb-4 text-red-500 dark:text-errorText border bg-red-100 dark:bg-errorBackground rounded-lg mt-4 flex justify-center items-center transition-colors duration-200`,
};

export default commonLoginSignupStyles;
