
Pod::Spec.new do |s|
    s.name         = "OCE"
    s.version      = "13.0.0"
    s.summary      = "Compiled OCE frameworks"
    s.license      = { :type => 'Commercial' }
    s.author       = { "OCE team" => "OCEAppsCommunications@iqvia.com" }
    s.homepage     = "https://www.iqvia.com/solutions/commercialization/orchestrated-customer-engagement"
    s.source       = { :git => ".", :tag => "#{s.version}" }
    s.public_header_files = 'Alamofire.framework/Headers/*.h'
    s.source_files        = 'Alamofire.framework/Headers/*.h'
    s.vendored_frameworks = 'AlamofireImage.framework'
    s.library             = 'c++', 'z'
    s.frameworks          = 'Security', 'SystemConfiguration', 'VideoToolbox'
    s.resources           = 'ocescripts/compareVersionsBetweenPodfileAndPackageJson.js'
    s.platform            = :ios
    s.swift_version       = '5.0'
    s.ios.deployment_target   = '12.1'
end

