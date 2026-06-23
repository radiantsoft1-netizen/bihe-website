<?php

namespace App\Support;

class SitePageRdcDefaults
{
    /**
     * @return list<array{
     *     id: string,
     *     title: string,
     *     category: string,
     *     aim: string,
     *     conclusion: string,
     *     images: list<array{alt: string, tone: string}>
     * }>
     */
    public static function projects(): array
    {
        return [
            [
                'id' => 'electricity-billing',
                'title' => 'Online Electricity Billing System',
                'category' => 'Web Application',
                'aim' => 'The aim of the Online Electricity Billing System project is to develop a web-based application that automates electricity bill generation, payment, and customer account management. The system reduces manual paperwork and human errors associated with traditional billing processes. It provides customers with convenient online access to view bills and make payments. The project supports transparent and efficient utility service management. Overall, it aims to improve operational productivity and enhance the customer experience.',
                'conclusion' => 'The Online Electricity Billing System successfully automates the conventional electricity billing process through a user-friendly web interface. It ensures accurate bill calculation based on meter readings and maintains secure customer records. The system reduces administrative workload and improves billing transparency. Customers can conveniently access their account details and payment history online. The project demonstrates the effective integration of database management and web application development. It can be enhanced with payment gateways, SMS notifications, and mobile app integration. Thus, the system provides a practical and efficient solution for modern electricity billing management.',
                'images' => [
                    ['alt' => 'Electricity bill payment system cover screen', 'tone' => 'navy'],
                    ['alt' => 'Login and sign-up interface for the billing system', 'tone' => 'aqua'],
                ],
            ],
            [
                'id' => 'skin-cancer-classification',
                'title' => 'Deep Learning Based Face Skin Cancer Classification System',
                'category' => 'Deep Learning',
                'aim' => 'The aim of the Deep Learning Based Face Skin Cancer Classification System is to detect and classify facial skin cancer at an early stage using deep learning and image processing techniques. The system analyzes facial skin images to identify abnormal patterns that may indicate cancerous growth. It assists medical professionals in making accurate and timely diagnostic decisions. The project explores the application of artificial intelligence in healthcare diagnostics. Overall, it aims to improve early detection rates and support better patient outcomes.',
                'conclusion' => 'The Deep Learning Based Face Skin Cancer Classification System effectively classifies facial skin cancer using trained deep learning models. It demonstrates high accuracy in analyzing skin images and identifying cancerous patterns. The system reduces diagnostic time and supports doctors in clinical decision-making. Advanced image processing techniques improve the reliability of classification results. The project highlights the importance of AI in modern healthcare applications. It can be enhanced with larger datasets, multi-class classification, and real-time mobile screening. Thus, the system serves as a valuable tool for early skin cancer detection and medical research.',
                'images' => [
                    ['alt' => 'Facial skin scan with digital grid overlay', 'tone' => 'lavender'],
                    ['alt' => 'Deep learning system architecture diagram', 'tone' => 'aqua'],
                ],
            ],
            [
                'id' => 'biometric-ignition',
                'title' => 'Biometric Based Car Ignition',
                'category' => 'Embedded Systems',
                'aim' => 'The aim of the Biometric Based Car Ignition system is to enhance vehicle security using biometric authentication. The project uses fingerprint recognition to allow only authorized users to start the vehicle. It prevents unauthorized access and reduces the risk of vehicle theft. The system replaces traditional keys with a secure biometric method. Overall, the project aims to provide a reliable and advanced vehicle security solution.',
                'conclusion' => 'The Biometric Based Car Ignition system successfully improves vehicle security through biometric verification. It ensures that only authorized users can start the car engine. The system reduces the chances of theft and unauthorized usage. Biometric authentication provides higher accuracy compared to traditional keys. The project demonstrates the effective use of embedded systems and biometrics. It can be enhanced by integrating multiple biometric methods and IoT features. Thus, the system offers a smart, secure, and efficient solution for modern vehicles.',
                'images' => [
                    ['alt' => 'Biometric car ignition system interface', 'tone' => 'navy'],
                    ['alt' => 'Embedded circuit layout for biometric ignition', 'tone' => 'aqua'],
                ],
            ],
            [
                'id' => 'customer-churn',
                'title' => 'Customer Churn Analysis Machine Learning',
                'category' => 'Machine Learning',
                'aim' => 'The aim of the Customer Churn Analysis project is to predict customers who are likely to leave a business using machine learning techniques. The system analyzes customer data such as usage patterns and service history. It helps organizations identify high-risk customers in advance. The project supports data-driven decision-making to improve customer retention. Overall, it aims to reduce customer loss and increase business profitability.',
                'conclusion' => 'The Customer Churn Analysis Using Machine Learning project effectively predicts customer churn using trained ML models. It helps businesses understand customer behavior and identify key factors influencing churn. Early prediction allows companies to take preventive actions to retain customers. The system improves marketing strategies and customer relationship management. Machine learning models provide better accuracy compared to traditional methods. The project can be enhanced with real-time data and advanced algorithms. Thus, the system serves as a valuable tool for improving customer retention and business growth.',
                'images' => [
                    ['alt' => 'Customer churn analysis dashboard', 'tone' => 'green'],
                    ['alt' => 'Machine learning model performance chart', 'tone' => 'lavender'],
                ],
            ],
            [
                'id' => 'vehicle-emission',
                'title' => 'IOT- Based Vehicle Emission Monitoring System',
                'category' => 'IoT Solution',
                'aim' => 'The aim of the IOT-Based Vehicle Emission Monitoring System is to continuously monitor vehicle emission levels using sensors. The system collects emission data and sends it to a cloud platform through IoT technology. It helps in detecting vehicles that exceed permissible pollution limits. The project supports environmental protection by reducing air pollution. Overall, it aims to promote smart and eco-friendly transportation systems.',
                'conclusion' => 'The IOT-Based Vehicle Emission Monitoring System provides an efficient solution for monitoring vehicle pollution in real time. It enables accurate detection of harmful gas emissions using sensors. The use of IoT allows remote monitoring and data analysis. Authorities can take timely action against vehicles exceeding emission limits. The system reduces manual inspection and improves transparency. It can be enhanced by integrating GPS, mobile applications, and alert systems. Thus, the project contributes to environmental safety and smart city development.',
                'images' => [
                    ['alt' => 'IoT vehicle emission monitoring hardware', 'tone' => 'navy'],
                    ['alt' => 'Emission monitoring cloud dashboard', 'tone' => 'aqua'],
                ],
            ],
        ];
    }

    /**
     * @param  array<string, mixed>  $content
     * @return list<array{
     *     id: string,
     *     title: string,
     *     category: string,
     *     aim: string,
     *     conclusion: string,
     *     images: list<array{path: string, alt: string, tone: string}>
     * }>
     */
    public static function resolveProjects(array $content): array
    {
        $defaults = collect(self::projects())->keyBy('id');
        $saved = collect($content['projects'] ?? [])
            ->filter(fn ($project) => is_array($project) && ! empty($project['id']))
            ->keyBy('id');

        return $defaults
            ->map(function (array $project) use ($saved): array {
                $override = $saved->get($project['id'], []);
                $savedImages = is_array($override['images'] ?? null) ? $override['images'] : [];
                $defaultImages = $project['images'];

                $images = [];
                for ($index = 0; $index < 2; $index++) {
                    $savedImage = is_array($savedImages[$index] ?? null) ? $savedImages[$index] : [];
                    $defaultImage = $defaultImages[$index] ?? ['alt' => '', 'tone' => 'navy'];

                    $images[] = [
                        'path' => (string) ($savedImage['path'] ?? ''),
                        'alt' => (string) ($savedImage['alt'] ?? $defaultImage['alt']),
                    ];
                }

                return [
                    'id' => $project['id'],
                    'title' => (string) ($override['title'] ?? $project['title']),
                    'category' => (string) ($override['category'] ?? $project['category']),
                    'aim' => (string) ($override['aim'] ?? $project['aim']),
                    'conclusion' => (string) ($override['conclusion'] ?? $project['conclusion']),
                    'images' => $images,
                ];
            })
            ->values()
            ->all();
    }
}
